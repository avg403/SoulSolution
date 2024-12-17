from transformers import pipeline

# Initialize the emotion classification pipeline with the pre-trained model
emotion_pipeline = pipeline("text-classification", model="SamLowe/roberta-base-go_emotions")

def analyze_emotion(text):
    """
    Analyze the emotions of a given text using the RoBERTa-based emotion classification model.

    Args:
        text (str): The input text to analyze.

    Returns:
        list: List of emotions and their respective scores.
    """
    result = emotion_pipeline(text)
    return result  # Result is a list of emotions with scores