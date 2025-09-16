# lead-scoring-backend
This is a **backend service** for scoring leads based on product/offer context and prospect data using **rule-based logic** and **AI reasoning**.  

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [API Endpoints](#api-endpoints)
- [Rule Logic & AI Integration](#rule-logic--ai-integration)
- [Testing](#testing)
- [Optional Bonus Features](#optional-bonus-features)
- [Future Improvements](#future-improvements)

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
git clone <https://github.com/GovardhanShemane/lead-scoring-backend/tree/main>
cd lead-scoring-backend
