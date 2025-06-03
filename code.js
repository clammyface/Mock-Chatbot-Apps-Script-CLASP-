function askOpenAI_MockFromA1() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const values = sheet.getRange("A1:A").getValues();
  const responses = [];

  for (let i = 0; i < values.length; i++) {
    const userInputRaw = values[i][0];
    const userInput = (userInputRaw || "").toLowerCase().trim();

    if (userInput === "") break;

    let response;

    if (userInput.includes("capital") && userInput.includes("japan")) {
      response = "Tokyo is the capital of Japan.";
    } else if (userInput.match(/temperature.*bangalore|bangalore.*temperature/)) {
      const temp = Math.floor(Math.random() * 6) + 25;
      response = `The current temperature in Bangalore is approximately ${temp}°C.`;
    } else if (userInput.includes("your name")) {
      response = "I'm a simulated GPT bot inside your Google Sheet.";
    } else if (userInput.includes("joke")) {
      const jokes = [
        "Why don’t scientists trust atoms? Because they make up everything!",
        "Parallel lines have so much in common… it’s a shame they’ll never meet.",
        "I told my computer I needed a break, and it said: ‘No problem, I’ll go to sleep.’"
      ];
      response = jokes[Math.floor(Math.random() * jokes.length)];
    } else {
      response = "Hmm… I’m not sure how to answer that right now, but I’ll get smarter soon!";
    }

    responses.push([response]);
  }

  if (responses.length > 0) {
    sheet.getRange(1, 2, responses.length, 1).setValues(responses);
  }
}