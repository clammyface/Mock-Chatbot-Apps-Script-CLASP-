function LIKHAI(query, range) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');

  // Convert table range into text format for the prompt
  const tableData = range && range.length
    ? range.map(row => row.join('\t')).join('\n')
    : 'No data selected.';

  const systemPrompt = "You are an intelligent assistant helping users understand data from Google Sheets. Respond concisely and helpfully.";
  const userPrompt = `${query}\n\nHere is the selected table data:\n${tableData}`;

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.7
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    payload: JSON.stringify(payload)
  };

  try {
    const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", options);
    const json = JSON.parse(response.getContentText());
    return json.choices[0].message.content.trim();
  } catch (e) {
    return "❌ Error: " + e.message;
  }
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

function processLikhaiQuery(query) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  const values = range.getValues();

  return LIKHAI(query, values); // now using actual selected data
}


function createTableFromUserPrompt() {
  const ui = SpreadsheetApp.getUi();
  const prompt = ui.prompt('Enter your query for a table (e.g., "6-week study plan")').getResponseText();

  const apiKey = PropertiesService.getScriptProperties().getProperty('OPENAI_API_KEY');
  const systemPrompt = `You are a table generator. Respond only in a Markdown table format.`;

  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ]
  };

  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: `Bearer ${apiKey}` },
    payload: JSON.stringify(payload)
  });

  const text = JSON.parse(response.getContentText()).choices[0].message.content;
  const rows = text.trim().split('\n').slice(2).map(row =>
    row.split('|').slice(1, -1).map(cell => cell.trim())
  );

  const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Generated Table');
  sheet.getRange(1, 1, rows.length, rows[0].length).setValues(rows);
}

function createDashboardFromPrompt() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getActiveRange();
  const data = range.getValues().map(row => row.join(',')).join('\n');
  const prompt = `Suggest charts and trends from the following data:\n${data}`;

  const result = LIKHAI(prompt, range.getValues());
  const ui = SpreadsheetApp.getUi();
  ui.alert("Likhai suggests:\n" + result);

  // Optionally auto-insert a bar chart on dummy data
  const chart = sheet.newChart()
    .setChartType(Charts.ChartType.BAR)
    .addRange(sheet.getRange(range.getA1Notation()))
    .setPosition(5, 5, 0, 0)
    .build();
  sheet.insertChart(chart);
}
