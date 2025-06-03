# 📊 Google Sheets Chatbot Linked to ChatGPT (via CLASP)

This project enables a Google Sheet to act as a **ChatGPT-powered chatbot**, using:
- Google Apps Script
- OpenAI API (or Mock logic)
- CLASP for local development
- GitHub for version control

---

## 🧾 Features
- Users type questions in **Column A**
- GPT responses appear automatically in **Column B**
- Can run in `dev` or `prod` mode using different script IDs
- Easy deployment with CLASP

---

## 📁 Folder Structure
```
google_sheets_chatbot/
├── Code.js              # Chatbot logic (mock or real API)
├── test.js              # Optional logger/test util
├── appsscript.json      # Script manifest
├── .clasp.json          # Auto-generated script binding
├── README.md            # This file
```

---

## 🔧 Prerequisites
- [x] Node.js & npm installed
- [x] Google account with Apps Script access
- [x] CLASP (`npm install -g @google/clasp`)
- [x] Apps Script API enabled: https://script.google.com/home/usersettings
- [x] GitHub account with a public or private repo

---

## 🚀 Setup & Deployment

### 1. Clone This Repo Locally
```bash
cd path/to/your/workspace
git clone https://github.com/clammyface/google_sheets.git
cd google_sheets_chatbot
git checkout -b chatbot-integration
```

### 2. Link to a Google Apps Script Project
```bash
clasp login
clasp clone 1omg9vg7D0ucNE6z_z6rhhnODbwqA_VC8bokyypt6y_P99ndcsaDOZiwn
```

This creates `.clasp.json` and links your folder.

### 3. Push Files to Apps Script
```bash
clasp push
```

### 4. Connect Apps Script to Google Sheet
- Open Google Sheet
- Go to `Extensions > Apps Script`
- You should now see your code!

### 5. Run It
- Put a prompt like `What is the capital of Japan?` in cell A1
- Run `askOpenAI_MockFromA1()` from Apps Script
- Response will appear in B1

---

## 📤 GitHub Deployment
```bash
git add .
git commit -m "Initial chatbot logic with clasp setup"
git push -u origin chatbot-integration
```

---

## 🧠 Example Logic in `Code.js`
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

## 🙋 Author
- GitHub: [@clammyface](https://github.com/clammyface)
