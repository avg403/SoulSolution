from transformers import pipeline
from sklearn.metrics import classification_report, confusion_matrix
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Load the RoBERTa model for sentiment analysis
emotion_pipeline = pipeline("text-classification", model="SamLowe/roberta-base-go_emotions")

# Load test dataset
df = pd.read_csv("test_data.csv")

# Make predictions
predictions = [emotion_pipeline(text)[0]['label'] for text in df["text"]]
true_labels = df["true_sentiment"].tolist()

# Print classification report
print("Classification Report:\n", classification_report(true_labels, predictions))

# Generate confusion matrix
cm = confusion_matrix(true_labels, predictions, labels=list(set(true_labels + predictions)))

# Plot the confusion matrix
plt.figure(figsize=(6, 4))
sns.heatmap(cm, annot=True, fmt="d", xticklabels=list(set(true_labels + predictions)), yticklabels=list(set(true_labels + predictions)))
plt.xlabel("Predicted")
plt.ylabel("True Label")
plt.title("Confusion Matrix for Sentiment Analysis Model")
plt.show()
