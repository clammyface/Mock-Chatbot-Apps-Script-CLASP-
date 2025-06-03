# 🧠 Google Sheets Mock Chatbot (Apps Script + CLASP)

This project creates a mock chatbot in Google Sheets using Google Apps Script.

## Features
- Responds to questions typed in column A
- Answers appear in column B
- Handles:
  - Capital city questions
  - Bangalore temperature
  - Name questions
  - Tells jokes
- All logic hardcoded — no external API call

## Setup

1. Use CLASP to push to your Apps Script project:
   ```bash
   clasp login
   clasp clone <scriptId>
   clasp push