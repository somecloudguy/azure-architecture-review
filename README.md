# Azure Architecture Review Web App

This is a self-service web application for conducting an Azure architecture review using a standardized set of 20 best-practice questions. The app helps architects, engineers, and teams assess their Azure solutions for resilience, scalability, security, and operational excellence.

Try it out here: https://nice-sky-09ce44610.2.azurestaticapps.net/

## Features

- **Step-by-step review:** Answer 20 architecture questions, each with selectable implementation status and a comment box.
- **Sidebar navigation:** Jump to any question at any time.
- **Automated scoring:** Each answer is scored; your total score is calculated and shown at the end.
- **Actionable summary:** The summary table is color-coded by score and sorted to highlight areas needing improvement, with recommended actions and direct links to Azure documentation.
- **Excel export:** Download your results as a color-coded Excel file (with a timestamped filename).
- **Restart option:** Easily restart the review from the summary page.

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/somecloudguy/azure-architecture-review.git
   cd azure-architecture-review
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The app will open at http://localhost:3000.

## How to Deploy as an Azure Static Web App

1. **Push your code to GitHub** (if not already done).
2. **Go to the https://portal.azure.com/** and create a new Static Web App:
   - Select your GitHub repo and branch.
   - Choose the React build preset.
   - Set `App location` to `/` and `Output location` to `build`.
3. **Azure will automatically build and deploy your app.**
4. **Access your app** at the provided Azure Static Web Apps URL.

## Technologies Used

- React
- sheetjs-style (for Excel export with color coding)
- Azure Static Web Apps (for deployment)

## Customization

- To change the questions, edit `src/questions.js`.
- To adjust scoring or color coding, edit `src/App.js` and `src/excelExport.js`.
