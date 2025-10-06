import * as XLSX from "sheetjs-style";

// Color mapping for scores
const scoreColors = {
  0: { fill: { fgColor: { rgb: "FFCCCC" } } },     // Red
  25: { fill: { fgColor: { rgb: "FFE5B4" } } },    // Orange
  50: { fill: { fgColor: { rgb: "FFFFB3" } } },    // Yellow
  75: { fill: { fgColor: { rgb: "B3D1FF" } } },    // Blue
  100: { fill: { fgColor: { rgb: "B3FFB3" } } }    // Green
};

export function exportToExcel(answers, questions, scores) {
  const data = answers.map((ans, idx) => ({
    "Question": questions[idx].question,
    "Comment": ans.observation,
    "Status": ans.option,
    "Score": scores[ans.option] || 0,
    "Recommended Action": questions[idx].recommendedAction,
    "Reference Link": questions[idx].documentationLink
  }));

  // Create worksheet and workbook
  const ws = XLSX.utils.json_to_sheet(data, { header: [
    "Question", "Comment", "Status", "Score", "Recommended Action", "Reference Link"
  ] });

  // Apply color coding to each row based on Score
  data.forEach((row, i) => {
    const excelRow = i + 2; // +2 because Excel is 1-indexed and row 1 is header
    const score = row.Score;
    const style = scoreColors[score] || {};
    // Apply style to all columns in the row
    ["A","B","C","D","E","F"].forEach(col => {
      const cell = ws[`${col}${excelRow}`];
      if (cell) cell.s = style;
    });
  });

  // Create workbook and add worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Results");

  // Generate timestamp for filename
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:T]/g, "").slice(0, 14);
  const filename = `AzureArchitectureReview_${timestamp}.xlsx`;

  XLSX.writeFile(wb, filename);
}