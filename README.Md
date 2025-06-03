# 🧠 Multi-Environment Google Sheets Chatbot (CLASP + Dev/Prod)

This project enables a Google Sheets chatbot that can be deployed to **multiple environments** (e.g., `dev` and `prod`) using Google Apps Script and managed locally via CLASP.

---

## 📦 Features
- CLASP-based Apps Script development
- Supports `dev` and `prod` environments via separate `.clasp` configs
- Dynamically pushes chatbot code to selected environment
- Works with Google Sheets: user enters query in Column A → response appears in Column B
- Supports mock chatbot logic or OpenAI API integration (template-ready)

---

## 📁 Folder Structure
```
DEV_PROD_ENV/
├── .gitignore
├── appsscript.json            # Shared manifest
├── clasp.env.dev.json         # CLASP config for dev
├── clasp.env.prod.json        # CLASP config for prod
├── code.js                    # Chatbot logic
├── test.js                    # Sample utility logger
├── testtemplate.js            # Template for real OpenAI version
├── deploy.sh                  # Script to deploy based on env
```

---

## ⚙️ Prerequisites
- [x] Node.js and npm
- [x] Google Account
- [x] CLASP installed globally: `npm install -g @google/clasp`
- [x] Git installed
- [x] Apps Script API enabled: [https://script.google.com/home/usersettings](https://script.google.com/home/usersettings)

---

## 🚀 Setup Instructions

### 🔧 1. Authenticate CLASP
```bash
clasp login
```

### 🔗 2. Link Environments
Each environment has its own script ID (created manually at https://script.google.com):

**`clasp.env.dev.json`**
```json
{
  "scriptId": "<DEV_SCRIPT_ID>",
  "rootDir": "./"
}
```

**`clasp.env.prod.json`**
```json
{
  "scriptId": "<PROD_SCRIPT_ID>",
  "rootDir": "./"
}
```

---

## 💬 Bot Logic (code.js)
```js
function askOpenAI_MockFromA1() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const values = sheet.getRange("A1:A").getValues();
  const responses = [];

  for (let i = 0; i < values.length; i++) {
    const prompt = (values[i][0] || "").toLowerCase().trim();
    if (prompt === "") break;

    let response;
    if (prompt.includes("capital") && prompt.includes("japan")) {
      response = "Tokyo is the capital of Japan.";
    } else if (prompt.includes("temperature") && prompt.includes("bangalore")) {
      const temp = Math.floor(Math.random() * 6) + 25;
      response = `Bangalore is approximately ${temp}°C.`;
    } else {
      response = "Sorry, I don’t know that yet.";
    }

    responses.push([response]);
  }

  if (responses.length > 0) {
    sheet.getRange(1, 2, responses.length, 1).setValues(responses);
  }
}
```

---

## 📜 Example `deploy.sh` (Unix/macOS/Linux)
```bash
#!/bin/bash

if [ "$1" == "dev" ]; then
  cp clasp.env.dev.json .clasp.json
  echo "🔁 Switched to DEV"
elif [ "$1" == "prod" ]; then
  cp clasp.env.prod.json .clasp.json
  echo "🔁 Switched to PROD"
else
  echo "❌ Invalid env. Use dev or prod"
  exit 1
fi

clasp push
```

Usage:
```bash
chmod +x deploy.sh
./deploy.sh dev     # Push to DEV
./deploy.sh prod    # Push to PROD
```

---

## ☁️ Git Workflow
```bash
git checkout -b env-support

git add .
git commit -m "🔀 Add dev/prod clasp environment switching support"
git push -u origin env-support
```

---

## 🧪 Test It in Google Sheet
1. Open linked Sheet (via script ID)
2. Type a question in **A1**
3. Go to `Extensions > Apps Script`
4. Run: `askOpenAI_MockFromA1()`
5. Watch answer appear in **B1**

---

## 👤 Author
- GitHub: [@clammyface](https://github.com/clammyface)
- Maintainer: Akash Rathi
