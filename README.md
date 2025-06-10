# 🧠 Likhai Assistant – GPT-Powered AI for Google Sheets

**Likhai Assistant** is an intelligent, GPT-powered chatbot for Google Sheets built by **Akash Rathi**. It brings seamless natural language processing to spreadsheets — allowing users to summarize data, ask questions, generate tables, and auto-create dashboards right from a sidebar.

---

## ✨ Key Features

- 🔍 **Custom Formula**  
  Use `=LIKHAI("summarize revenue trend", A1:D10)` to get insights on spreadsheet data directly in cells.

- 💬 **Interactive Chat Sidebar**  
  A sleek, WhatsApp-style chat UI inside Google Sheets. Supports multi-turn dialogue, shows loading spinners, and retains message history.

- 🧠 **Context-Aware Chat**  
  Auto-includes selected table data in your prompt so GPT can answer contextually.

- 📋 **Prompt-Based Table Generator**  
  Describe any structure in plain English — e.g. “Make a 6-week physics study plan” — and Likhai generates a usable markdown table inserted into a new sheet.

- 📊 **Dashboard Generator**  
  Select any data, ask "suggest charts," and it creates labeled column/bar charts with headings and axis labels.

- 📈 **Persistent Conversation History**  
  Keeps the last 10 turns stored for continued conversations.

- ⏳ **Smart Loading State**  
  Prevents multiple submissions, shows spinner while LLM responds.

- 🛠 **Logging for Interactions**  
  Every query + response is logged in a `Likhai Logs` sheet for easy review.

- 🔐 **Secure Key Management**  
  Uses a script property to store the API key securely. Now integrated with **LiteLLM (GPT-4o-mini)**.

---

## 🔧 Built With

- 🧠 [LiteLLM](https://dev-litellm.leadschool.in/) GPT-4o-mini model (secure, internal endpoint)
- 📄 Google Apps Script (backend + formula handler)
- 💬 HTML + CSS (for styled sidebar UI with chat bubbles)
- 🚀 [CLASP](https://github.com/google/clasp) (command-line Apps Script deploy tool)

---

## 🛠 Deployment Guide

> This setup assumes you have Apps Script linked via `clasp` or want to clone and push changes.

```bash
# 1. Clone this repo
git clone https://github.com/clammyface/Mock-Chatbot-Apps-Script-CLASP-.git
cd Likhai-UI-Final

# 2. Install clasp (if not already installed)
npm install -g @google/clasp

# 3. Authenticate with Google
clasp login

# 4. Link to your Apps Script project
# OR replace .clasp.json with your script ID:
"scriptId": "YOUR_SCRIPT_ID_HERE"

# 5. Push to Apps Script project
clasp push

# 6. Open Google Sheet > Extensions > Apps Script > Run `onOpen`
#    Then access the sidebar from "🧠 Likhai Assistant" menu
Likhai-UI-Final/
├── .clasp.json          # Links local project to Google Apps Script
├── appsscript.json      # Manifest with timeZone, oauthScopes, etc.
├── Code.js              # Backend logic (formula, chat, charts, logging)
├── chat.html            # Chat UI with rounded messages & spinner
├── README.md            # You’re reading it
✍️ Author
Built with ❤️ by Akash Rathi