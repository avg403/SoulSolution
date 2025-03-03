# fallback_handler.py
from transformers import pipeline
import torch

class FallbackHandler:
    def _init_(self):
        # Using facebook/blenderbot-400M-distill for balanced performance and empathy
        self.model = pipeline(
            "text2text-generation",
            model="facebook/blenderbot-400M-distill",
            device=0 if torch.cuda.is_available() else -1
        )
        
    async def generate_response(self, text: str, emotion: str = None) -> str:
        try:
            # Add emotional context to the input
            context = f"[Emotion: {emotion}] " if emotion else ""
            enhanced_input = context + text
            
            # Generate response with some constraints for stability
            response = self.model(
                enhanced_input,
                max_length=100,
                num_return_sequences=1,
                temperature=0.7,
                do_sample=True
            )
            
            if response and len(response) > 0:
                return response[0]['generated_text'].strip()
            return "I'm sorry, I'm having trouble understanding. Could you rephrase that?"
            
        except Exception as e:
            print(f"Fallback generation error: {str(e)}")
            return "I apologize, but I'm having trouble processing that right now. Could you try again?"