# Real-Time Hate Speech Detection

## Overview
This project implements a **real-time hate speech detection system** using **DistilBERT**, a lightweight transformer model. Designed to classify text into **Hate** and **NoHate**. The model is trained on a balanced dataset and deployed with the aim of creating a complete end-to-end application.

## Deployment
This project is deployed and accessible online:

Frontend (Netlify):
https://hate-speech-detection-007.netlify.app/
enter text and instantly see whether it is classified as hate speech or not, along with the model's confidence score.

Backend API (Hugging Face Spaces):
https://architrawat25-real-time-hate-speech-detection.hf.space
FastAPI backend serves predictions from a transformer-based model and exposes REST endpoints for both single and batch predictions.

## Objective
- Prymary objective: to build a hate speech detection model using **DistilBERT**.
- Balance the dataset using **Back Translation** to improve model performance.
- Develop an **API** for real-time inference.
- Deploy the API using Docker and integrate it with cloud services for real-time inference

## Dataset
The dataset is sourced from https://huggingface.co/datasets/odegiber/hate_speech18. This original dataset was highly imbalanced with approximately **9:1** ratio of non-hate to hate speech samples. To address this, **Back Translation** was applied using the **facebook/m2m100_418M** model, creating a more balanced dataset for training.
https://huggingface.co/architrawat25


## Approach
1. **Data Preprocessing**:
   - Clean text data by removing special characters and lowercasing.
   - Convert text files to a structured CSV format.

2. **Dataset Balancing**:
   - Applied **Back Translation** to augment minority class samples.
   - Generated balanced dataset with an equal number of **Hate** and **NoHate** samples.

3. **Model Training**:
   - Fine-tuned **DistilBERT** on the balanced dataset.
   - Achieved high performance with **94% accuracy** on the test set.

4. **Model Saving & Hosting**:
   - Saved the fine-tuned model.
   - Uploaded the model to **Hugging Face** for easy access and deployment.
     https://huggingface.co/architrawat25
     

5. **API Development (Upcoming)**:
   - Develop an API using **Flask** or **FastAPI**.
   - Provide endpoints for text classification.

6. **Cloud Deployment (Upcoming)**:
   - Deploy the API on cloud platforms like **Heroku** or **AWS**.

## Results
The model achieved the following performance on the test dataset:
| Metric      | Value |
|------------|-------|
| Accuracy   | 94%   |
| Precision  | 94%   |
| Recall     | 94%   |
| F1 Score   | 94%   |

The model demonstrated consistent performance across both hate and non-hate classes.

## Dependencies
- Python
- Transformers
- PyTorch
- Hugging Face
- NLTK
- Pandas
- Scikit-learn


## Next Steps
- Build API for real-time text classification.
- Dockerise and then deploy the API to the cloud.
- Create a interface for easier user interaction.

## Author
Archit Rawat

## License
This project is licensed under the MIT License.

