# 🧠 Likhai Assistant – GPT-Powered AI for Google Sheets

Likhai Assistant is a smart, GPT-powered AI companion for Google Sheets built by **Akash Rathi**. It brings conversational intelligence and spreadsheet automation together — letting users summarize, generate tables, and auto-suggest dashboards with simple natural language prompts.

---

## ✨ Features

- 🔍 **Custom Formula**: Use `=LIKHAI("summarize revenue trend", A1:D10)` directly in cells to get insights.
- 💬 **Chat Sidebar**: An interactive HTML sidebar lets users chat with GPT-3.5 right inside the spreadsheet.
- 📋 **Prompt-Based Table Generation**: Enter a prompt like "Make a 7-day study plan" and generate a markdown table into a new sheet.
- 📊 **Dashboard Helper**: Select data, then ask Likhai to suggest and auto-create charts like bar or line graphs.
- 🔐 **Works with OpenAI API Key**: Securely stored via script properties (not in source code).

---

## 🔧 Built With

- 🧠 OpenAI GPT-3.5 API (can switch to GPT-4 if available)
- 📄 Google Apps Script for backend logic
- 🧩 HTML + Sidebar UI for chat
- 🚀 CLASP (`clasp`) for local GitHub integration

---

## 🛠 Deployment Guide

> This setup assumes you already have a Google Apps Script project created or use the provided script ID.

```bash
# 1. Clone this repo
git clone https://github.com/clammyface/Mock-Chatbot-Apps-Script-CLASP-.git
cd Likhai-UI-Final

# 2. Install clasp (if not already installed)
npm install -g @google/clasp

# 3. Log in to clasp with your Google account
clasp login

# 4. Link to your Apps Script project
# If new, update `.clasp.json` with your new scriptId or use:
"scriptId": "1XVMSvdFSd5RZItUqSECZuv6k3Ub1Ky-N-c0sQD9OHJsGMckGXRV5Sq90"

# 5. Push code to Apps Script
clasp push

# 6. Open Google Sheets > Extensions > Apps Script > Deploy as add-on
## 📁 Folder Structure

Likhai-UI-Final/
├── .clasp.json # Links project to Google Apps Script
├── appsscript.json # Apps Script project manifest (triggers, timeZone, etc.)
├── code.js # Main backend logic: formula, table/chart handlers
├── chat.html # HTML sidebar UI for GPT chat
├── README.md # Project documentation
## ✍️ Author

Built with ❤️ by **Akash Rathi**  
- 🧠 Full-stack Google Apps Script + OpenAI developer  
- 🛠️ Passionate about smart tooling & internal AI assistants  
- 🌐 GitHub: [@clammyface](https://github.com/clammyface)  
- 📩 Connect via organization domain or raise an issue on GitHub

---

