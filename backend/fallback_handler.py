# fallback_handler.py
from transformers import pipeline
import torch

class FallbackHandler:
    def __init__(self):
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
                
            # Enhance the input with emotion, but without dominating the input
            if emotion and emotion not in ["neutral"]:
                # Just use a short indicator for non-neutral emotions
                enhanced_input = f"[{emotion}] {text}"
            else:
                enhanced_input = text
            
            print(f"Generating fallback response for: '{enhanced_input[:100]}...'")
            
            # Generate response with constraints for more natural conversational flow
            response = self.model(
                enhanced_input,
                max_length=100,
                num_return_sequences=1,
                temperature=0.75,  # Slight increase for better conversational variety
                do_sample=True,
                # Parameters tuned for better conversational flow
                top_k=50,
                top_p=0.94,  # Slight increase to allow more creative responses
                repetition_penalty=1.25  # Slightly stronger repetition prevention
            )
            
            if response and len(response) > 0:
                result = response[0]['generated_text'].strip()
                
                # Clean up the result if needed (sometimes models repeat input)
                if result.startswith(enhanced_input):
                    result = result[len(enhanced_input):].strip()
                
                # Remove any system markers or artifacts
                result = result.replace("[neutral]", "").replace("[happy]", "")
                result = result.replace("[sad]", "").replace("[angry]", "")
                result = result.replace("[love]", "").replace("[anxiety]", "")
                result = result.replace("User asks:", "").replace("Previously mentioned:", "")
                
                # Make sure result isn't empty after cleaning
                if not result or len(result) < 5:
                    # Generate more contextual default responses based on emotion
                    if emotion == "sad":
                        result = "I understand that can be difficult. How else are you feeling about this?"
                    elif emotion == "happy":
                        result = "That's wonderful! I'm glad to hear that. Would you like to tell me more?"
                    elif emotion == "angry":
                        result = "I see you're feeling strongly about this. What specifically is bothering you?"
                    elif emotion == "love":
                        result = "Love is a powerful emotion. Could you tell me more about these feelings?"
                    else:
                        result = "I'm here to listen. Would you like to share more about that?"
                
                print(f"Generated fallback response: '{result}'")
                return result
            return "I'm listening. Would you like to tell me more about that?"
            
        except Exception as e:
            print(f"Fallback generation error: {str(e)}")
            return "I apologize, but I'm having trouble processing that right now. Could you try again?"