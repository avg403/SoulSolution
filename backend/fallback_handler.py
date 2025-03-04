# fallback_handler.py
from transformers import pipeline
import torch

class FallbackHandler:
    def __init__(self):  # Fixed: Changed _init_ to __init__ (double underscores)
        # Using facebook/blenderbot-400M-distill for balanced performance and empathy
        try:
            print("Initializing fallback handler with blenderbot model...")
            self.model = pipeline(
                "text2text-generation",
                model="facebook/blenderbot-400M-distill",
                device=0 if torch.cuda.is_available() else -1
            )
            print("Fallback model initialized successfully")
        except Exception as e:
            print(f"Error initializing fallback model: {e}")
            self.model = None
        
    async def generate_response(self, text: str, emotion: str = None) -> str:
        try:
            # Check if model was properly initialized
            if self.model is None:
                print("Fallback model was not initialized properly")
                return "I'm sorry, I'm having trouble understanding. Could you rephrase that?"
                
            # Add emotional context to the input
            context = f"[Emotion: {emotion}] " if emotion else ""
            enhanced_input = context + text
            
            print(f"Generating fallback response for: '{enhanced_input}'")
            
            # Generate response with some constraints for stability
            response = self.model(
                enhanced_input,
                max_length=100,
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True
            )
            
            if response and len(response) > 0:
                result = response[0]['generated_text'].strip()
                print(f"Generated fallback response: '{result}'")
                return result
            return "I'm sorry, I'm having trouble understanding. Could you rephrase that?"
            
        except Exception as e:
            print(f"Fallback generation error: {str(e)}")
            return "I apologize, but I'm having trouble processing that right now. Could you try again?"