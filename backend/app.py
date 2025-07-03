"""
Hate-Speech Detection API for Hugging Face Spaces
"""

from pathlib import Path
from typing import List
import torch
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import (
    AutoModelForSequenceClassification,
    AutoTokenizer,
    TextClassificationPipeline,
)

# Configuration
MODEL_DIR = Path("./model")
LABELS = ["NON-HATE", "HATE"]
DEVICE = 0 if torch.cuda.is_available() else -1

# Load model and tokenizer
tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR)
model = AutoModelForSequenceClassification.from_pretrained(
    MODEL_DIR, torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32
)
pipeline = TextClassificationPipeline(
    model=model,
    tokenizer=tokenizer,
    device=DEVICE,
    return_all_scores=True,
)

# FastAPI app
app = FastAPI(
    title="Hate-Speech Detection API",
    description="Real-time hate speech detection using transformer models",
    version="1.0.0",
)

# CORS configuration
origins = [
    "https://hate-speech-detection-007.netlify.app",  # Your Netlify frontend
    "https://huggingface.co",
    "*"  # Allow all origins for demo purposes
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

class TextInput(BaseModel):
    text: str

class BatchInput(BaseModel):
    texts: List[str]

@app.get("/")
def root():
    return {
        "message": "Hate Speech Detection API",
        "status": "active",
        "author": "Archit Rawat",
        "github": "https://github.com/Architrawat25",
        "huggingface": "https://huggingface.co/architrawat25"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": True}

@app.post("/predict")
def predict(item: TextInput):
    if not item.text.strip():
        raise HTTPException(status_code=400, detail="Input text is empty.")

    result = pipeline(item.text, truncation=True, max_length=512)[0]
    sorted_by_score = sorted(result, key=lambda x: x["score"], reverse=True)
    top = sorted_by_score[0]
    label_idx = int(top["label"].split("_")[-1])

    return {
        "label": LABELS[label_idx],
        "confidence": round(top["score"], 4),
        "input_text": item.text,
        "model_info": "Transformer-based hate speech classifier"
    }

@app.post("/batch_predict")
def batch_predict(items: BatchInput):
    if not items.texts:
        raise HTTPException(status_code=400, detail="No texts provided.")

    predictions = pipeline(
        items.texts,
        truncation=True,
        max_length=512,
        batch_size=min(8, len(items.texts)),
    )

    results = []
    for prediction in predictions:
        sorted_by_score = sorted(prediction, key=lambda x: x["score"], reverse=True)
        top = sorted_by_score[0]
        label_idx = int(top["label"].split("_")[-1])
        results.append({
            "label": LABELS[label_idx],
            "confidence": round(top["score"], 4)
        })

    return {"results": results, "count": len(results)}
