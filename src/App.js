import React, { useState } from "react";
import { questions } from "./questions";
import { exportToExcel } from "./excelExport";

const scores = {
  "Not Implemented": 0,
  "Testing/Considering": 25,
  "Partially Implemented": 50,
  "Mostly Implemented": 75,
  "Fully Implemented and Optimized": 100
};

const scoreColors = {
  0: "#ffcccc",     // Red
  25: "#ffe5b4",    // Orange
  50: "#ffffb3",    // Yellow
  75: "#b3d1ff",    // Blue
  100: "#b3ffb3"    // Green
};

const docTitles = {
  "https://learn.microsoft.com/azure/availability-zones/az-overview": "What are Azure availability zones? | Microsoft Learn",
  "https://learn.microsoft.com/azure/storage/common/storage-redundancy": "Data redundancy - Azure Storage | Microsoft Learn",
  "https://learn.microsoft.com/azure/azure-sql/database/high-availability-sla": "Availability through redundancy - Azure SQL Database",
  "https://learn.microsoft.com/azure/architecture/guide/technology-choices/load-balancing-overview": "Load Balancing Options - Azure Architecture Center | Microsoft Learn",
  "https://learn.microsoft.com/azure/site-recovery/site-recovery-overview": "Azure Site Recovery documentation | Microsoft Learn",
  "https://learn.microsoft.com/azure/architecture/best-practices/transient-faults": "Transient fault handling - Azure Architecture Center | Microsoft Learn",
  "https://learn.microsoft.com/azure/azure-monitor/autoscale/autoscale-overview": "Autoscale in Azure Monitor - Azure Monitor | Microsoft Learn",
  "https://learn.microsoft.com/azure/service-bus-messaging/compare-messaging-services": "Compare Azure messaging services - Azure Service Bus | Microsoft Learn",
  "https://learn.microsoft.com/en-us/azure/frontdoor/create-front-door-portal": "Quickstart: Create an Azure Front Door using the Azure portal",
  "https://learn.microsoft.com/azure/azure-cache-for-redis/cache-overview": "Azure Cache for Redis Documentation - learn.microsoft.com",
  "https://learn.microsoft.com/azure/azure-sql/database/purchasing-models": "Azure SQL Database documentation - Azure SQL | Microsoft Learn",
  "https://learn.microsoft.com/azure/azure-sql/database/query-performance-insight-use": "Query Performance Insight for Azure SQL Database",
  "https://learn.microsoft.com/azure/azure-resource-manager/templates/key-vault-parameter?tabs=azure-cli": "Key Vault parameters in ARM templates - Azure Resource Manager",
  "https://learn.microsoft.com/azure/virtual-network/network-security-groups-overview": "Network security groups overview - Azure Virtual Network",
  "https://learn.microsoft.com/azure/private-link/private-endpoint-overview": "Private Endpoint overview - Azure Private Link",
  "https://learn.microsoft.com/azure/web-application-firewall/overview": "Web Application Firewall documentation - Azure WAF",
  "https://learn.microsoft.com/azure/azure-monitor/overview": "Azure Monitor overview - Azure Monitor | Microsoft Learn",
  "https://learn.microsoft.com/azure/azure-monitor/alerts/alerts-log": "Alerts in Azure Monitor - Azure Monitor | Microsoft Learn",
  "https://learn.microsoft.com/azure/azure-monitor/app/app-insights-overview": "Application Insights overview - Azure Monitor | Microsoft Learn",
  "https://learn.microsoft.com/en-us/azure/developer/terraform/overview": "Terraform on Azure documentation - Azure for Developers"
};

function App() {
  const [answers, setAnswers] = useState(
    Array.from({ length: questions.length }, () => ({ option: "", observation: "" }))
  );
  const [current, setCurrent] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const handleOptionChange = (value) => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[current] = { ...updated[current], option: value };
      return updated;
    });
  };

  const handleObservationChange = (value) => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[current] = { ...updated[current], observation: value };
      return updated;
    });
  };

  const jumpTo = (idx) => setCurrent(idx);

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowSummary(true);
    }
  };

  const prev = () => setCurrent((c) => Math.max(c - 1, 0));

  const totalScore = answers.reduce(
    (sum, ans) => sum + (scores[ans.option] || 0),
    0
  );

  // Prepare summary data with original index for stable sorting
  const summaryData = answers.map((ans, idx) => ({
    idx,
    question: questions[idx].question,
    observation: ans.observation,
    option: ans.option,
    score: scores[ans.option] || 0,
    recommendedAction: questions[idx].recommendedAction,
    documentationLink: questions[idx].documentationLink
  }));

  // Sort by score ascending, then by question number
  summaryData.sort((a, b) => a.score - b.score || a.idx - b.idx);

  // Reset everything for restart
  const restartReview = () => {
    setAnswers(Array.from({ length: questions.length }, () => ({ option: "", observation: "" })));
    setCurrent(0);
    setShowSummary(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f9fa" }}>
      {/* Sidebar for navigation */}
      {!showSummary && (
        <div style={{
          width: 120,
          background: "#222e3c",
          color: "#fff",
          padding: "20px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          boxShadow: "2px 0 8px rgba(0,0,0,0.04)"
        }}>
          <div style={{ fontWeight: "bold", marginBottom: 20, fontSize: 16 }}>Questions</div>
          {questions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              style={{
                width: 40,
                height: 40,
                margin: "4px 0",
                borderRadius: "50%",
                border: current === idx ? "2px solid #4f8cff" : "1px solid #ccc",
                background: current === idx ? "#4f8cff" : (answers[idx].option ? "#b3ffb3" : "#fff"),
                color: current === idx ? "#fff" : "#222e3c",
                fontWeight: current === idx ? "bold" : "normal",
                cursor: "pointer",
                outline: "none",
                transition: "all 0.2s"
              }}
              title={q.question}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, maxWidth: 1100, margin: "auto", padding: 20 }}>
        <h1 style={{ marginTop: 0 }}>Azure Architecture Review</h1>
        {!showSummary ? (
          <div>
            <h2>Question {current + 1} of {questions.length}</h2>
            <p><strong>{questions[current].question}</strong></p>
            <textarea
              style={{ width: "100%", minHeight: 60, fontSize: 16, marginBottom: 10 }}
              value={answers[current].observation}
              onChange={(e) => handleObservationChange(e.target.value)}
              placeholder="Enter your observations"
            />
            <div style={{ margin: "20px 0" }}>
              {questions[current].options.map((opt) => (
                <label key={opt} style={{ display: "block", marginBottom: 8, fontSize: 16 }}>
                  <input
                    type="radio"
                    name={`option-${current}`}
                    value={opt}
                    checked={answers[current].option === opt}
                    onChange={() => handleOptionChange(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
            <button onClick={prev} disabled={current === 0}>Previous</button>
            <button onClick={next} style={{ marginLeft: 10 }}>
              {current === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        ) : (
          <div>
            <div style={{
              background: "#222e3c",
              color: "#fff",
              padding: "24px 32px",
              borderRadius: 12,
              marginBottom: 24,
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.07)"
            }}>
              Your Architecture Review Score is {totalScore} / {questions.length * 100}
            </div>
            <div style={{ fontSize: 18, marginBottom: 18, textAlign: "center" }}>
              You can improve your score by incorporating the following enhancements:
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 30, fontSize: "0.98em", background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>#</th>
                  <th style={{ border: "1px solid #ccc", padding: 8, textAlign: "left" }}>Question</th>
                  <th style={{ border: "1px solid #ccc", padding: 8, textAlign: "left" }}>Comment</th>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>Status</th>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>Score</th>
                  <th style={{ border: "1px solid #ccc", padding: 8, textAlign: "left" }}>Recommended Action</th>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>Reference Link</th>
                </tr>
              </thead>
              <tbody>
                {summaryData.map((item) => (
                  <tr key={item.idx} style={{ background: scoreColors[item.score] }}>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.idx + 1}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.question}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.observation || <em>No comment</em>}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.option || <em>Not Answered</em>}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8, fontWeight: "bold" }}>{item.score}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>{item.recommendedAction}</td>
                    <td style={{ border: "1px solid #ccc", padding: 8 }}>
                      <a
                        href={item.documentationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {docTitles[item.documentationLink] || "Reference"}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => exportToExcel(answers, questions, scores)}
                style={{
                  background: "#4f8cff",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "12px 28px",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.07)"
                }}
              >
                Download Results as Excel
              </button>
              <button
                onClick={restartReview}
                style={{
                  background: "#fff",
                  color: "#222e3c",
                  border: "2px solid #4f8cff",
                  borderRadius: 6,
                  padding: "12px 28px",
                  fontSize: 16,
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginLeft: 16
                }}
              >
                Restart Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;