# AI Operations Automation — AI-Assisted Issue Intake & Triage

## Overview

An AI-powered operational issue intake and triage workflow designed to help HR and Operations teams quickly classify, prioritize, and respond to operational issues.

The solution combines **Google Forms, Google Sheets, Google Apps Script, and the Gemini API** to transform unstructured operational requests into structured, actionable information.

## Business Problem

Operational issues are often submitted through informal channels and require manual review before someone can determine:

* What area is affected
* How urgent the issue is
* What priority it should receive
* What action should be taken

This creates delays, inconsistent prioritization, and unnecessary manual work.

## Solution

I built an automated workflow that captures an operational issue, sends the relevant information to Gemini for analysis, and writes the structured AI output back into the operational tracker.

The workflow automatically produces:

* **Category**
* **Priority**
* **Urgency**
* **Issue summary**
* **Recommended action**

## Workflow

```text
Google Form
     ↓
Google Sheets
     ↓
Google Apps Script
     ↓
Gemini API
     ↓
Structured JSON
     ↓
Google Sheets
     ↓
Operational Triage
```

## Technology Stack

| Technology         | Purpose                                 |
| ------------------ | --------------------------------------- |
| Google Forms       | Operational issue intake                |
| Google Sheets      | Data storage and operational tracker    |
| Google Apps Script | Workflow automation and API integration |
| Gemini API         | AI-powered issue analysis               |
| JavaScript         | Automation logic                        |

## Example

### Input

**Issue:**
Three new employees are starting next Monday, but their laptops and system access have not been prepared.

**Area:**
People / HR

**Expected Impact:**
High

**Deadline:**
Within 24 hours

### AI Output

**Category:**
People / HR

**Priority:**
High

**Urgency:**
Within 24 hours

**Summary:**
Three incoming employees starting next Monday do not have their required laptops and system access prepared.

**Recommended Action:**
Immediately coordinate with the IT department to fast-track laptop provisioning and system access creation to ensure day-one readiness.

## Automation Logic

The workflow uses a Google Apps Script trigger that runs when a new form submission is received.

The script:

1. Reads the submitted operational issue.
2. Retrieves the affected area, expected impact, and deadline.
3. Sends the information to the Gemini API.
4. Requests a structured JSON response.
5. Parses the AI response.
6. Writes the analysis back into the corresponding Google Sheets row.

## Testing

The workflow was tested with multiple operational scenarios.

### Test Case 1 — Employee Onboarding

Three new employees required laptops and system access before their start date.

**Result:** The workflow correctly classified the issue as People / HR, assigned High priority, identified the 24-hour urgency, and generated an actionable recommendation.

### Test Case 2 — Shared Drive Access

Two employees were unable to access a company shared drive while working on a time-sensitive client project.

**Result:** The workflow correctly identified the issue as an IT access problem, assigned High priority, identified the 24-hour urgency, and generated an appropriate escalation recommendation.

## Project Evidence

The following screenshots document the implementation, automation, and testing of the workflow.

### Google Apps Script — Automation

![Apps Script Automation 1](screenshots/App%20Script%20Automation%20-%201.PNG)

![Apps Script Automation 2](screenshots/App%20Script%20Automation%20-%202.PNG)

![Apps Script Automation 3](screenshots/App%20Scrpit%20Automation%20-%203.PNG)

![Apps Script Automation 4](screenshots/App%20Script%20Automation%20-%204.PNG)

![Apps Script Automation 5](screenshots/App%20Script%20Automation%20-%205.PNG)

Additional project documentation and source code are available in the repository.

## Security

The Gemini API key is stored using **Google Apps Script Properties** rather than being hard-coded into the source code.

The API credential is therefore not included in the project source code or screenshots.

API keys should never be committed to a public repository.

## Limitations

This prototype currently relies on Gemini's analysis and does not independently verify operational recommendations.

AI-generated classifications and recommendations should therefore be reviewed by an appropriate human owner before critical operational decisions are made.

## Future Improvements

Potential next iterations include:

* Automated Slack or Microsoft Teams notifications
* Automatic assignment to the appropriate operational owner
* SLA tracking and escalation
* Dashboarding and reporting
* Historical issue analytics
* Confidence scoring
* Integration with ticketing platforms
* Human approval workflows for high-impact issues

## Key Takeaway

This project demonstrates how lightweight AI automation can convert an unstructured operational intake process into a structured triage workflow, reducing manual analysis and improving operational visibility.
