import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from rasa.core.agent import Agent
from rasa.shared.constants import DEFAULT_NLU_FALLBACK_INTENT_NAME
from sentiment_analysis import analyze_emotion
from fallback_handler import FallbackHandler  # Make sure this file exists in the same directory

app = FastAPI()

# Configure CORS - IMPORTANT: This must be added before any routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"],  # Add all potential frontend URLs
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Explicitly include OPTIONS
    allow_headers=["Content-Type", "Authorization"],  # Common headers
)

rasa_agent = None
fallback_handler = None

class TextRequest(BaseModel):
    text: str

class EmotionChatResponse(BaseModel):
    text: str
    emotions: list
    bot_response: str
    response_source: str = "rasa"  # Default value to maintain compatibility

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

async def get_response(text: str, emotions: list):
    global rasa_agent, fallback_handler

    # Safety check - make sure both components are loaded
    if not rasa_agent or not fallback_handler:
        success = await load_agents()
        if not success:
            raise HTTPException(status_code=500, detail="Failed to initialize required components")

    try:
        # Get primary emotion
        primary_emotion = (
            max(emotions, key=lambda x: x.get("score", 0)).get("label", "neutral")
            if emotions else "neutral"
        )
        
        # First, parse the message to check intent and confidence
        parse_result = await rasa_agent.parse_message(text)
        print(f"Debug - Parse result: {parse_result}")
        
        intent_name = parse_result.get("intent", {}).get("name", "")
        confidence = parse_result.get("intent", {}).get("confidence", 0)
        
        print(f"Debug - Intent: {intent_name}, Confidence: {confidence}")
        
        # Define confidence thresholds
        HIGH_CONFIDENCE = 0.85
        MEDIUM_CONFIDENCE = 0.60
        
        # If confidence is low or it's a fallback intent, use the fallback handler
        if intent_name == DEFAULT_NLU_FALLBACK_INTENT_NAME or confidence < MEDIUM_CONFIDENCE or not intent_name:
            print(f"Debug - Using fallback handler for text: '{text}' with emotion: '{primary_emotion}'")
            # This should call your custom fallback_handler.py logic
            fallback_response = await fallback_handler.generate_response(text, primary_emotion)
            print(f"Debug - Fallback response: {fallback_response}")
            return fallback_response, "fallback"
        
        # For high confidence, use Rasa's response
        responses = await rasa_agent.handle_text(text)
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
                print(f"Debug - Using Rasa response with confidence {confidence}")
                return response_text, "rasa"
        
        # If we got here, there was no valid Rasa response, use fallback
        print("Debug - No valid Rasa response, using fallback")
        fallback_response = await fallback_handler.generate_response(text, primary_emotion)
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
        # Analyze emotions
        try:
            emotions = analyze_emotion(request.text)
            print(f"Debug - Emotions detected: {emotions}")
        except Exception as e:
            print(f"Emotion analysis error: {e}")
            emotions = []
        
        # Get response with source information
        bot_response, response_source = await get_response(request.text, emotions)
        
        # Prepare response object
        response = {
            "text": request.text,
            "emotions": emotions,
            "bot_response": bot_response,
            "response_source": response_source
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
        "fallback_status": "loaded" if fallback_handler else "not_loaded"
    }
    
    return status

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)