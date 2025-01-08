from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionDefaultFallback(Action):
    def name(self) -> Text:
        return "action_default_fallback"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Get current emotion
        current_emotion = tracker.get_slot("detected_emotion")
        
        # Customize fallback based on emotion
        if current_emotion == "frustrated" or current_emotion == "anger":
            message = "I understand this is frustrating. Let me try to help in a different way."
        elif current_emotion == "sadness":
            message = "I'm sorry I couldn't understand. Please take your time to explain, I'm here to listen."
        else:
            message = "I'm sorry, I didn't understand that. Could you please rephrase?"
            
        dispatcher.utter_message(text=message)
        return []

class ActionSetEmotion(Action):
    def name(self) -> Text:
        return "action_set_emotion"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        # Get the emotion from the metadata
        metadata = tracker.latest_message.get("metadata", {})
        emotion = metadata.get("emotion", "neutral")
        
        # Set the emotion slot
        return [SlotSet("detected_emotion", emotion)]