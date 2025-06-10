// ========== Code.gs ==========

const LITE_LLM_ENDPOINT = "https://dev-litellm.leadschool.in/chat/completions";
const LITE_LLM_KEY = "sk-5BWbp70TbFmOu8SXa9VzFQ";

function LIKHAI(messages) {
  if (!Array.isArray(messages) || messages.length === 0 || !messages[0].content) {
    return "❌ Error: Prompt is empty or invalid.";
  }

  const payload = {
    model: "gpt-4o-mini",
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content || "Hello"
    })),
    temperature: 0.7
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${LITE_LLM_KEY}`
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch(LITE_LLM_ENDPOINT, options);
    const jsonText = response.getContentText();
    Logger.log("Raw Response: " + jsonText);

    const json = JSON.parse(jsonText);
    if (!json.choices || !json.choices[0] || !json.choices[0].message) {
      return "❌ Error: Unexpected response structure.\n" + jsonText;
    }

    return json.choices[0].message.content.trim();
  } catch (e) {
    return "❌ Error: " + e.message;
  }
}

function processLikhaiQuery(query) {
  Logger.log("Query received: " + query);

  // More forgiving input check
  if (typeof query !== "string" || query.trim().length < 2) {
    return "❌ Error: Please enter a valid prompt.";
  }

  // Get selected table range and format it
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  const values = range.getValues();
  const tableText = values.map(row => row.join('\t')).join('\n');

  // Retrieve existing conversation history
  let history = PropertiesService.getUserProperties().getProperty("chatHistory");
  history = history ? JSON.parse(history) : [];

  // Combine query and table context
  const contextIntro = "Here is the selected table data:\n" + tableText;
  history.push({ role: "user", content: `${query}\n\n${contextIntro}` });

  // Limit to last 10 messages
  if (history.length > 10) history.shift();

  // Get AI response
  const response = LIKHAI(history);

  // Append assistant's reply and save
  history.push({ role: "assistant", content: response });
  PropertiesService.getUserProperties().setProperty("chatHistory", JSON.stringify(history));

  // Log query and reply
  logInteraction(query, response);
  return response;
}


function logInteraction(userPrompt, aiResponse) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let logSheet = ss.getSheetByName("Likhai Logs");
  if (!logSheet) logSheet = ss.insertSheet("Likhai Logs");
  logSheet.appendRow([new Date(), userPrompt, aiResponse]);
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🧠 Likhai Assistant')
    .addItem('Open Chat Sidebar', 'showLikhaiSidebar')
    .addItem('Generate Table from Prompt', 'createTableFromUserPrompt')
    .addItem('Create Dashboard', 'createDashboardFromPrompt')
    .addToUi();
}

function showLikhaiSidebar() {
  const html = HtmlService.createHtmlOutputFromFile("chat").setTitle("Likhai Assistant");
  SpreadsheetApp.getUi().showSidebar(html);
}

function createTableFromUserPrompt() {
  const ui = SpreadsheetApp.getUi();
  const prompt = ui.prompt('Enter your query for a table (e.g., "6-week study plan")').getResponseText();

  const messages = [
    { role: "system", content: "You are a table generator. Respond only in a Markdown table format." },
    { role: "user", content: prompt }
  ];

  const tableText = LIKHAI(messages);
  const rows = tableText.trim().split('\n').slice(2).map(row =>
    row.split('|').slice(1, -1).map(cell => cell.trim())
  );

  const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Generated Table');
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}

function createDashboardFromPrompt() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  const data = range.getValues().map(row => row.join(',')).join('\n');

  const messages = [
    { role: "system", content: "You are a data analyst bot. Suggest charts and trends." },
    { role: "user", content: `Suggest charts and trends from the following data:\n${data}` }
  ];

  const result = LIKHAI(messages);
  SpreadsheetApp.getUi().alert("Likhai suggests:\n" + result);

  const chart = sheet.newChart()
    .setChartType(Charts.ChartType.COLUMN)
    .addRange(range)
    .setOption('title', 'Likhai Dashboard Suggestion')
    .setOption('hAxis', { title: 'X-Axis' })
    .setOption('vAxis', { title: 'Y-Axis' })
    .setPosition(5, 5, 0, 0)
    .build();
  sheet.insertChart(chart);
}

