from transformers import pipeline

# Initialize the emotion classification pipeline with your local model
emotion_pipeline = pipeline("text-classification", model="roberta_model")

def analyze_emotion(text):
    """
    Analyze the emotions of a given text using the locally saved RoBERTa-based emotion classification model.

    Args:
        text (str): The input text to analyze.

    Returns:
        list: List of emotions and their respective scores.
    """
    result = emotion_pipeline(text)
    return result  # Result is a list of emotions with scores