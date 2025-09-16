# lead-scoring-backend
This is a **backend service** for scoring leads based on product/offer context and prospect data using **rule-based logic** and **AI reasoning**.  

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Rule Logic & AI Integration](#rule-logic--ai-integration)
- [Testing](#testing)
- [Deployment](#deployment)

---

## Features
- Accepts **product/offer information** via JSON.
- Uploads **leads CSV** with details like name, role, company, industry, location, and LinkedIn bio.
- **Scores leads** 0–100 based on:
  - Rule-based scoring (role relevance, industry match, data completeness)
  - AI-based scoring (intent classification using OpenAI GPT)
- Returns scored results with **intent, score, and reasoning**.
- Export results as **CSV** (bonus feature).
- Unit tests for rule engine included.

---

## Tech Stack
- Node.js (v20+)
- Express.js
- Multer (CSV upload)
- csv-parser & json2csv
- OpenAI API
- Jest (unit testing)
- Optional: Docker

---

## Setup & Installation

1. Clone the repository:
```bash
git clone https://github.com/GovardhanShemane/lead-scoring-backend.git
cd lead-scoring-backend


2. Install dependencies:
npm install

3.Create a .env file in the root:
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here

4.Start the server locally:
npm start
Server will run on http://localhost:5000.

API Base URL
All requests below use this base URL:
https://lead-scoring-backend-1.onrender.com/

API Endpoints
1. Add Offer

POST: /api/offer
Request Body (JSON):
{
  "name": "AI Outreach Automation",
  "value_props": ["24/7 outreach", "6x more meetings"],
  "ideal_use_cases": ["B2B SaaS mid-market"]
}

2. Upload Leads CSV

POST: /api/leads/upload
Form-data: file (CSV file with columns: name,role,company,industry,location,linkedin_bio)
EXAMPLE : 
name,role,company,industry,location,linkedin_bio
Ava Patel,Head of Growth,FlowMetrics,B2B SaaS mid-market,New York,"Experienced in SaaS Growth"
John Doe,Product Manager,TechCorp,Healthcare,San Francisco,"Innovative product strategist"

3. Run Scoring
POST: /api/score
No body required. Scores all uploaded leads using rule-based + AI scoring.

4. Get Scored Results
GET: /api/results
Response Example:
[
  {
    "name": "Ava Patel",
    "role": "Head of Growth",
    "company": "FlowMetrics",
    "intent": "High",
    "score": 85,
    "reasoning": "Fits ICP SaaS mid-market and role is decision maker."
  }
]

5. Export Results as CSV 
GET: /api/results/export
Downloads a CSV file of scored leads.


Rule Logic & AI Integration
Rule-based scoring (0–50 points):
Role relevance:
Decision maker: +20
Influencer: +10
Others: 0

Industry match:
Exact ICP: +20
Adjacent: +10
Others: 0
Data completeness: +10 if all fields present
AI-based scoring (0–50 points):
Sends each lead + offer info to OpenAI GPT
GPT classifies intent as High/Medium/Low with 1–2 sentence reasoning
Points mapping: High = 50, Medium = 30, Low = 10
Final Score: rule_score + ai_points

Testing
Run unit tests for the rule engine:
npm test
Tests validate scoring logic for different lead scenarios.


Deployment

Deployed backend URL: https://lead-scoring-backend-1.onrender.com/
All endpoints are live and accessible for testing
Environment variables should be configured on Render for AI integration

Future Improvements
Add Docker support for containerized deployment
Add more unit tests (AI layer testing)
Authentication & rate limiting for API

