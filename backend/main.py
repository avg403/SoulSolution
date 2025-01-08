import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from rasa.core.agent import Agent
from sentiment_analysis import analyze_emotion

app = FastAPI()

rasa_agent = None

class TextRequest(BaseModel):
    text: str

class EmotionChatResponse(BaseModel):
    text: str
    emotions: list
    bot_response: str

async def load_rasa_agent():
    global rasa_agent
    try:
        rasa_agent = await asyncio.to_thread(Agent.load, "rasa/models/model.tar.gz")
    except Exception as e:
        print(f"Error loading Rasa agent: {e}")
        raise HTTPException(status_code=500, detail="Error loading Rasa agent")

@app.on_event("startup")
async def startup_event():
    await load_rasa_agent()

async def get_rasa_response(text, emotions):
    global rasa_agent

    if not rasa_agent:
        raise HTTPException(status_code=500, detail="Rasa agent not initialized")

    try:
        # Get primary emotion
        primary_emotion = (
            max(emotions, key=lambda x: x.get("score", 0)).get("label", "neutral")
            if emotions else "neutral"
        )
        
        # Combine emotion with text input
        enhanced_text = f"/inform{{\"emotion\": \"{primary_emotion}\"}} {text}"
        responses = await rasa_agent.handle_text(enhanced_text)
        
        if responses and len(responses) > 0:
            return responses[0].get("text", "I'm not sure how to respond.")
        return "I'm not sure how to respond."
        
    except Exception as e:
        print(f"Rasa processing error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Rasa processing error: {str(e)}")

@app.post("/emotion-chat/", response_model=EmotionChatResponse)
async def emotion_chat(request: TextRequest):
    try:
        # Analyze emotions
        try:
            emotions = analyze_emotion(request.text)
        except Exception as e:
            print(f"Emotion analysis error: {e}")
            emotions = []
        
        # Get bot response with emotion context
        bot_response = await get_rasa_response(request.text, emotions)
        
        return {
            "text": request.text,
            "emotions": emotions,
            "bot_response": bot_response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    if rasa_agent is None:
        return {"status": "unhealthy", "details": "Rasa agent not loaded"}
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    asyncio.run(load_rasa_agent())
    uvicorn.run(app, host="0.0.0.0", port=8000)