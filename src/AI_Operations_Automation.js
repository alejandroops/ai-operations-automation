function testGemini() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();


  // Get information from the latest form response
  const issue = sheet.getRange(lastRow, 2).getValue();
  const area = sheet.getRange(lastRow, 3).getValue();
  const impact = sheet.getRange(lastRow, 4).getValue();
  const deadline = sheet.getRange(lastRow, 5).getValue();


  // Get Gemini API key
  const apiKey = PropertiesService
    .getScriptProperties()
    .getProperty("GEMINI_API_KEY");


  const prompt = `
You are an operations analyst.


Analyze the following operational issue.


Issue: ${issue}
Area: ${area}
Expected impact: ${impact}
Deadline: ${deadline}


Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.
Do not add explanations before or after the JSON.


Use exactly this structure:


{
  "category": "string",
  "priority": "Critical, High, Medium, or Low",
  "urgency": "Immediate, Within 24 hours, Within 3 days, or Routine",
  "summary": "string",
  "recommended_action": "string"
}
`;


  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";


  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };


  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-goog-api-key": apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };


  const response = UrlFetchApp.fetch(url, options);
  const responseText = response.getContentText();


  Logger.log(responseText);


  // Parse Gemini response
  const responseJson = JSON.parse(responseText);


  const aiText =
    responseJson.candidates[0].content.parts[0].text;


  // Convert Gemini's JSON text into a JavaScript object
  const analysis = JSON.parse(aiText);


  // Write AI results into columns F-J
  sheet.getRange(lastRow, 6).setValue(analysis.category);
  sheet.getRange(lastRow, 7).setValue(analysis.priority);
  sheet.getRange(lastRow, 8).setValue(analysis.urgency);
  sheet.getRange(lastRow, 9).setValue(analysis.summary);
  sheet.getRange(lastRow, 10).setValue(analysis.recommended_action);


  Logger.log("AI analysis successfully written to the Sheet.");
}
function onFormSubmit(e) {
  const sheet = e.range.getSheet();
  const row = e.range.getRow();


  const issue = sheet.getRange(row, 2).getValue();
  const area = sheet.getRange(row, 3).getValue();
  const impact = sheet.getRange(row, 4).getValue();
  const deadline = sheet.getRange(row, 5).getValue();


  const apiKey = PropertiesService
    .getScriptProperties()
    .getProperty("GEMINI_API_KEY");


  const prompt = `
You are an operations analyst.


Analyze the following operational issue.


Issue: ${issue}
Area: ${area}
Expected impact: ${impact}
Deadline: ${deadline}


Return ONLY valid JSON.


Do not use markdown.
Do not use code fences.
Do not add explanations before or after the JSON.


Use exactly this structure:


{
  "category": "string",
  "priority": "Critical, High, Medium, or Low",
  "urgency": "Immediate, Within 24 hours, Within 3 days, or Routine",
  "summary": "string",
  "recommended_action": "string"
}
`;


  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent";


  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };


  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "x-goog-api-key": apiKey
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };


  const response = UrlFetchApp.fetch(url, options);
  const responseText = response.getContentText();


  Logger.log(responseText);


  const responseJson = JSON.parse(responseText);
  const aiText =
    responseJson.candidates[0].content.parts[0].text;


  const analysis = JSON.parse(aiText);


  sheet.getRange(row, 6).setValue(analysis.category);
  sheet.getRange(row, 7).setValue(analysis.priority);
  sheet.getRange(row, 8).setValue(analysis.urgency);
  sheet.getRange(row, 9).setValue(analysis.summary);
  sheet.getRange(row, 10).setValue(analysis.recommended_action);


  Logger.log("Automatic AI analysis completed for row " + row);
}
