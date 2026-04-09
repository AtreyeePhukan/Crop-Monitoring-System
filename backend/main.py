from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BLYNK_TOKEN = os.getenv("BLYNK_TOKEN")
BLYNK_BASE_URL = os.getenv("BLYNK_BASE_URL", "https://blynk.cloud")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


class SuggestionRequest(BaseModel):
    soil: float
    temperature: float
    humidity: float
    light: str


@app.get("/api/data")
def get_sensor_data():
    try:
        url = f"{BLYNK_BASE_URL}/external/api/getAll?token={BLYNK_TOKEN}"
        response = requests.get(url)
        data = response.json()

        soil = float(data.get("v1", 0))
        temperature = float(data.get("v2", 0))
        humidity = float(data.get("v3", 0))
        light = data.get("v4", "UNKNOWN")

        # --- Soil health (primary) ---
        if soil < 20:
            status = "Soil critically dry — water immediately"
        elif soil < 30:
            status = "Plant needs water"
        elif soil > 85:
            status = "Soil too wet — reduce watering"

        # --- Temperature stress (secondary) ---
        elif temperature > 38:
            status = "Heat stress — provide shade or cooling"
        elif temperature < 10:
            status = "Too cold — move plant to a warmer spot"

        # --- Humidity (secondary) ---
        elif humidity < 30:
            status = "Air too dry — consider misting"

        # --- Healthy (soil and humidity) ---
        elif soil >= 30 and humidity >= 30:
            if light == "DARK":
                status = "Soil is healthy — low light detected"
            else:
                status = "Soil is healthy"

        else:
            status = "Monitoring..."

        return {
            "soil": soil,
            "temperature": temperature,
            "humidity": humidity,
            "light": light,
            "status": status
        }

    except Exception as e:
        return {"error": f"Failed to fetch Blynk data: {str(e)}"}


@app.post("/api/suggestion")
def get_suggestion(payload: SuggestionRequest):
    try:
        prompt = f"""
You are a plant care assistant for a student IoT crop monitoring dashboard.

Sensor values:
- Soil Moisture: {payload.soil}%
- Temperature: {payload.temperature} °C
- Humidity: {payload.humidity}%
- Light Condition: {payload.light}

Give:
1. A short observation
2. A short practical suggestion

Rules:
- keep it beginner friendly
- max 3 short lines
- suitable for project demo
"""

        headers = {
            "Authorization": f"Bearer {GROQ_API_KEY}",
            "Content-Type": "application/json"
        }

        body = {
            "model": "llama-3.3-70b-versatile",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a simple helpful plant assistant."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.5,
            "max_tokens": 120
        }

        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=body
        )

        result = response.json()

        suggestion = (
            result.get("choices", [{}])[0]
            .get("message", {})
            .get("content", "No suggestion available.")
        )

        return {"suggestion": suggestion}

    except Exception as e:
        return {"error": f"Failed to generate suggestion: {str(e)}"}