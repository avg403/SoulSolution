import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rasa.core.agent import Agent
from rasa.shared.constants import DEFAULT_NLU_FALLBACK_INTENT_NAME
from sentiment_analysis import analyze_emotion
from fallback_handler import FallbackHandler
import uuid
from typing import Optional, List, Dict
import time

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

rasa_agent = None
fallback_handler = None

# In-memory conversation cache (for faster response than Firebase)
# Format: {session_id: [{"text": str, "is_user": bool, "timestamp": int, "source": str}, ...]}
conversation_cache = {}
# Cache expiration time (30 minutes in seconds)
CACHE_EXPIRATION = 30 * 60

class TextRequest(BaseModel):
    text: str
    context: Optional[str] = None
    session_id: Optional[str] = None

class EmotionChatResponse(BaseModel):
    text: str
    emotions: list
    bot_response: str
    response_source: str = "rasa"
    session_id: Optional[str] = None

async def load_agents():
    global rasa_agent, fallback_handler
    try:
        # Load Rasa agent
        rasa_agent = await asyncio.to_thread(Agent.load, "rasa/models/model.tar.gz")
        print("Rasa agent loaded successfully")
        
        # Initialize fallback handler
        fallback_handler = FallbackHandler()
        print("Fallback handler initialized successfully")
        
        return True
    except Exception as e:
        print(f"Error loading agents: {e}")
        return False

@app.on_event("startup")
async def startup_event():
    success = await load_agents()
    if not success:
        print("Failed to initialize agents during startup")

# Helper function to clean old sessions from cache
def clean_expired_sessions():
    current_time = time.time()
    expired_sessions = []
    
    for session_id, messages in conversation_cache.items():
        if not messages:
            expired_sessions.append(session_id)
            continue
            
        last_message_time = messages[-1].get("timestamp", 0) / 1000  # Convert ms to seconds
        if current_time - last_message_time > CACHE_EXPIRATION:
            expired_sessions.append(session_id)
    
    for session_id in expired_sessions:
        del conversation_cache[session_id]
    
    return len(expired_sessions)

def extract_intent_keywords(text: str) -> list:
    """Extract potential intent keywords from text"""
    keywords = []
    # Common emotion/mental health related keywords
    emotion_keywords = [
        "sad", "happy", "angry", "anxious", "depressed", "worried", 
        "stressed", "lonely", "frustrated", "tired", "overwhelmed",
        "scared", "excited", "grateful", "calm", "confused",
        "hurt", "disappointed", "hopeless", "hopeful"
    ]
    
    # Check for these keywords in the text
    text_lower = text.lower()
    for keyword in emotion_keywords:
        if keyword in text_lower:
            keywords.append(keyword)
    
    return keywords

def create_conversation_summary(messages: List[Dict], max_messages=3) -> str:
    """
    Create a semantic summary of recent conversation without including exact message content
    to avoid confusing the model but maintain context
    """
    if not messages:
        return ""
        
    # Get the most recent messages (limited number)
    recent_messages = messages[-max_messages:] if len(messages) > max_messages else messages
    
    # Extract emotion patterns and topics
    emotions = []
    topics = set()
    
    # Simple topic extraction based on keywords
    topic_keywords = {
        "work": ["job", "work", "boss", "career", "colleague"],
        "relationship": ["partner", "girlfriend", "boyfriend", "wife", "husband", "marriage", "dating"],
        "family": ["family", "parent", "child", "mother", "father", "sister", "brother"],
        "health": ["health", "sick", "doctor", "hospital", "pain", "medication"],
        "finance": ["money", "finance", "debt", "afford", "expensive", "cost"],
        "education": ["school", "college", "university", "class", "study", "exam"],
    }
    
    for msg in recent_messages:
        if not msg.get("is_user", False):  # Skip bot messages for topic extraction
            continue
            
        text = msg.get("text", "").lower()
        
        # Check for emotions
        emotion_keywords = extract_intent_keywords(text)
        if emotion_keywords:
            emotions.extend(emotion_keywords)
            
        # Check for topics
        for topic, keywords in topic_keywords.items():
            if any(keyword in text for keyword in keywords):
                topics.add(topic)
    
    # Build a semantic summary
    summary_parts = []
    
    if emotions:
        unique_emotions = list(set(emotions))
        if len(unique_emotions) > 1:
            summary_parts.append(f"The user has mentioned feeling {', '.join(unique_emotions[:-1])} and {unique_emotions[-1]}.")
        else:
            summary_parts.append(f"The user has mentioned feeling {unique_emotions[0]}.")
    
    if topics:
        topics_list = list(topics)
        if len(topics_list) > 1:
            summary_parts.append(f"They've been discussing topics related to {', '.join(topics_list[:-1])} and {topics_list[-1]}.")
        else:
            summary_parts.append(f"They've been discussing topics related to {topics_list[0]}.")
    
    if not summary_parts:
        # If we couldn't extract specific information, provide a generic context
        if len(recent_messages) >= 2:
            return "The conversation has been ongoing for a few messages."
        else:
            return "This is the start of the conversation."
    
    return " ".join(summary_parts)

async def get_response(text: str, emotions: list, session_id: str, context: Optional[str] = None):
    global rasa_agent, fallback_handler, conversation_cache

    # Safety check - make sure both components are loaded
    if not rasa_agent or not fallback_handler:
        success = await load_agents()
        if not success:
            raise HTTPException(status_code=500, detail="Failed to initialize required components")
    
    # Create or retrieve session from cache
    if session_id not in conversation_cache:
        conversation_cache[session_id] = []
    
    # Clean expired sessions occasionally
    if len(conversation_cache) > 100:
        cleaned = clean_expired_sessions()
        if cleaned > 0:
            print(f"Cleaned {cleaned} expired conversation sessions from cache")
    
    # Get conversation history
    conversation = conversation_cache[session_id]
    
    try:
        # Get primary emotion
        primary_emotion = (
            max(emotions, key=lambda x: x.get("score", 0)).get("label", "neutral")
            if emotions else "neutral"
        )
        
        # First, check for direct emotional expressions that should be handled by Rasa
        emotion_keywords = extract_intent_keywords(text)
        
        # Create a context summary without including exact previous messages
        conversation_summary = create_conversation_summary(conversation)
        print(f"Debug - Conversation summary: {conversation_summary}")
        
        # NEW APPROACH: First try Rasa with just the current user message
        # This gives Rasa the best chance to properly identify intents
        parse_result = await rasa_agent.parse_message(text)
        print(f"Debug - Initial parse result: {parse_result}")
        
        intent_name = parse_result.get("intent", {}).get("name", "")
        confidence = parse_result.get("intent", {}).get("confidence", 0)
        
        print(f"Debug - Intent: {intent_name}, Confidence: {confidence}")
        
        # Define confidence thresholds
        HIGH_CONFIDENCE = 0.80
        MEDIUM_CONFIDENCE = 0.60
        
        # We'll use a smarter strategy to determine which model to use:
        # 1. If there are clear emotion keywords or high confidence intent, use Rasa
        # 2. If the confidence is medium and we have context, use Rasa with context
        # 3. Otherwise, use fallback
        
        # Step 1: Check for strong direct emotional expressions or high confidence
        use_rasa = bool(emotion_keywords) or (confidence >= HIGH_CONFIDENCE and intent_name != DEFAULT_NLU_FALLBACK_INTENT_NAME)
        
        # Step 2: If not clear, but decent confidence and we have context, try Rasa with context
        if not use_rasa and confidence >= MEDIUM_CONFIDENCE and intent_name != DEFAULT_NLU_FALLBACK_INTENT_NAME:
            use_rasa = True
        
        if use_rasa:
            print(f"Debug - Using Rasa. Intent: {intent_name}, Confidence: {confidence}")
            
            # Prepare input for Rasa
            # For higher confidence intents, just use the text to avoid confusion
            # For medium confidence, include minimal context clues
            rasa_input = text
            if confidence < HIGH_CONFIDENCE and conversation_summary:
                # Add minimal context information
                rasa_input = f"{conversation_summary} Current message: {text}"
            
            print(f"Debug - Rasa input: {rasa_input}")
            
            # Get response from Rasa
            responses = await rasa_agent.handle_text(rasa_input)
            print(f"Debug - Rasa responses: {responses}")
            
            # Process Rasa responses
            if responses and len(responses) > 0:
                # Extract text from responses
                response_text = ""
                for response in responses:
                    if isinstance(response, dict) and "text" in response:
                        if response_text:
                            response_text += "\n\n"
                        response_text += response["text"]
                
                if response_text:
                    # Save to conversation history
                    conversation.append({"text": text, "is_user": True, "timestamp": int(time.time() * 1000), "source": "user"})
                    conversation.append({"text": response_text, "is_user": False, "timestamp": int(time.time() * 1000), "source": "rasa"})
                    
                    # Trim the conversation history if it gets too long
                    if len(conversation) > 20:
                        conversation = conversation[-20:]
                    
                    return response_text, "rasa"
            
            # If Rasa didn't produce a response despite strong intent, use fallback
            print("Debug - Rasa returned no response, using fallback")
        
        # Fallback approach
        print(f"Debug - Using fallback handler")
        
        # Create a context for the fallback handler
        # Include both conversation summary and emotion keywords for better context
        fallback_input = text
        
        # Only include conversation summary if we have substantial history
        if conversation_summary:
            fallback_input = f"{conversation_summary} Current message: {text}"
        
        # Get fallback response
        fallback_response = await fallback_handler.generate_response(fallback_input, primary_emotion)
        print(f"Debug - Fallback response: {fallback_response}")
        
        # Save to conversation history
        conversation.append({"text": text, "is_user": True, "timestamp": int(time.time() * 1000), "source": "user"})
        conversation.append({"text": fallback_response, "is_user": False, "timestamp": int(time.time() * 1000), "source": "fallback"})
        
        # Trim the conversation history if it gets too long
        if len(conversation) > 20:
            conversation = conversation[-20:]
        
        return fallback_response, "fallback"
            
    except Exception as e:
        print(f"Error in get_response: {str(e)}")
        # In case of error, try to use fallback if available
        try:
            if fallback_handler:
                return await fallback_handler.generate_response(text, primary_emotion), "fallback"
        except:
            pass
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.post("/emotion-chat/", response_model=EmotionChatResponse)
async def emotion_chat(request: TextRequest):
    try:
        # Generate or use provided session ID
        session_id = request.session_id or str(uuid.uuid4())
        
        # Analyze emotions
        try:
            emotions = analyze_emotion(request.text)
            print(f"Debug - Emotions detected: {emotions}")
        except Exception as e:
            print(f"Emotion analysis error: {e}")
            emotions = []
        
        # Get response with source information
        bot_response, response_source = await get_response(
            request.text, 
            emotions, 
            session_id,
            request.context
        )
        
        # Prepare response object
        response = {
            "text": request.text,
            "emotions": emotions,
            "bot_response": bot_response,
            "response_source": response_source,
            "session_id": session_id
        }
        
        print(f"Debug - Final response: {response}")
        return response
        
    except Exception as e:
        print(f"Error in emotion_chat: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Add explicit OPTIONS route handler for the emotion-chat endpoint
@app.options("/emotion-chat/")
async def options_emotion_chat():
    return {"detail": "OK"}

@app.get("/health")
async def health_check():
    global rasa_agent, fallback_handler
    
    status = {
        "status": "healthy" if rasa_agent and fallback_handler else "unhealthy",
        "rasa_status": "loaded" if rasa_agent else "not_loaded",
        "fallback_status": "loaded" if fallback_handler else "not_loaded",
        "active_sessions": len(conversation_cache)
    }
    
    return status

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)