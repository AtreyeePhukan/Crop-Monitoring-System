# Crop Monitoring System using IoT

A simple IoT-based Crop / Plant Monitoring System built using **NodeMCU ESP8266**, multiple sensors, **Blynk**, a **React dashboard**, and a **FastAPI backend**.

This project monitors basic plant health conditions such as soil moisture, temperature, humidity, and light condition. It also includes an AI suggestion feature using the **Groq API** to provide plant care recommendations based on current sensor readings.

---

## Project Overview

This system collects sensor data from a plant monitoring setup and displays it on:

- **Blynk Mobile Dashboard**
- **Web Dashboard (React + FastAPI)**

The goal of the project is to create a beginner-friendly, low-cost, and practical smart agriculture / smart plant monitoring system suitable for coursework and demonstration purposes.

---

## Features

### Hardware Monitoring
- Soil Moisture Monitoring
- Temperature Monitoring
- Humidity Monitoring
- Light Detection

### Blynk Integration
- Live sensor values shown on Blynk
- Soil moisture alert notification when plant needs water

### Web Dashboard
- Clean React-based UI
- Displays live sensor values
- Shows plant status
- Fetches data from backend API

### AI Suggestion Feature
- Uses **Groq API**
- Generates simple plant-care suggestions such as:
  - "Soil is dry, please water the plant."
  - "Low light detected, move plant to a brighter area."

---

## Tech Stack

### Hardware
- NodeMCU ESP8266
- LM393 Soil Moisture Sensor Module
- DHT11 Sensor
- LDR Sensor Module
- Breadboard
- Jumper Wires

### Software / Tools
- Arduino IDE
- Blynk IoT
- React (Vite)
- FastAPI
- Groq API
- GitHub
- Render (backend deployment)
- Vercel (frontend deployment)

---

## Hardware Components Used

- NodeMCU ESP8266
- LM393 Soil Moisture Sensor Module
- DHT11 Sensor
- LDR Sensor Module
- Breadboard
- Jumper wires
- USB cable

---

## Sensor Connections

### NodeMCU Power to Breadboard
- **3V pin** → `+` rail
- **G (GND) pin** → `-` rail

### Soil Moisture Sensor (LM393 Module)
- **VCC** → `+` rail
- **GND** → `-` rail
- **AO** → `A0` on NodeMCU
- **DO** → Not used

### DHT11
- **VCC** → `+` rail
- **GND** → `-` rail
- **DATA** → `D4`

### LDR Module
- **VCC** → `+` rail
- **GND** → `-` rail
- **DO** → `D5`
- **AO** → Not used

---

## Sensor Logic

### Soil Moisture Sensor

The soil moisture sensor is used in analog mode:

- **Dry / air** → high raw value (~1000–1024)
- **Wet soil** → low raw value (~250–400)

These values are mapped into a percentage where 0% = dry and 100% = wet.

Calibration values used:

```cpp
int dryVal = 1024;
int wetVal = 250;
```

Soil moisture percentage:

```cpp
soilPercent = map(soilRaw, dryVal, wetVal, 0, 100);
soilPercent = constrain(soilPercent, 0, 100);
```

### DHT11

Used to measure temperature (°C) and humidity (%).

### LDR

Used in digital mode:

- `HIGH` = BRIGHT
- `LOW` = DARK

---

## Blynk Datastreams

| Virtual Pin | Parameter       |
|-------------|-----------------|
| V1          | Soil Moisture % |
| V2          | Temperature     |
| V3          | Humidity        |
| V4          | Light Condition |

### Blynk Notification Event

**Event Name:** Soil Moisture  
**Event ID:** `soil_moisture`

Triggered when:
```
soilPercent < 30
```

Reset when:
```
soilPercent >= 40
```

---

## Web Dashboard Features

The web dashboard displays:

- Soil Moisture (%)
- Temperature (°C)
- Humidity (%)
- Light Condition (Bright / Dark)
- Plant Status

Example status messages:

- Soil is healthy
- Plant needs water
- Low sunlight detected

---

## AI Suggestion Feature

The dashboard includes a **Get Plant Suggestion** button. When clicked, it sends the current sensor values to the backend, which uses the Groq API to generate a simple suggestion.

Example suggestions:

- "Soil is dry, please water the plant."
- "Humidity is stable. No immediate action needed."
- "Low light detected, move the plant to a brighter area."

---

## Project Structure

```
crop_monitoring_system/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── .env
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── .env
│   └── ...
│
├── .gitignore
└── README.md
```

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/AtreyeePhukan/Crop-Monitoring-System.git
cd Crop-Monitoring-System
```

### 2. Backend Setup (FastAPI)

Go to the backend folder:

```bash
cd backend
```

Create a virtual environment (optional but recommended):

```bash
python -m venv venv
```

Activate it:

```bash
# Windows
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```
BLYNK_TOKEN=your_blynk_token
BLYNK_BASE_URL=https://blynk.cloud
GROQ_API_KEY=your_groq_api_key
```

Run the backend:

```bash
uvicorn main:app --reload
```

Backend runs at `http://127.0.0.1:8000`

### 3. Frontend Setup (React + Vite)

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside `frontend/`:

```
VITE_API_URL=http://127.0.0.1:8000
```

Run the frontend:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`

---

## API Endpoints

### Get Live Sensor Data

```
GET /api/data
```

### Get AI Suggestion

```
POST /api/suggestion
```

---


## Learning Outcomes

This project helped in understanding:

- IoT sensor integration
- ESP8266 programming
- Blynk cloud dashboard
- FastAPI backend development
- React frontend integration
- API handling
- Basic AI integration using Groq API

---

## Future Improvements

- Add charts for historical sensor data
- Add database support
- Add multiple plant profiles
- Add automatic pump control
- Add weather integration
- Add email or SMS alerts

---

## Author

**Atreyee Phukan**  
Built as a coursework / academic IoT project.
