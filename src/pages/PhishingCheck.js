import React, { useState } from "react";
import bg from "../assets/bg3.jpg";

function PhishingCheck() {

  const [input, setInput] =
    useState("");

  const [analyzed, setAnalyzed] =
    useState(false);

  const [isInvalid, setIsInvalid] =
    useState(false);

  const [invalidMessage,
    setInvalidMessage] =
    useState("");

  const [threats, setThreats] =
    useState([]);

  const [score, setScore] =
    useState(0);

  const [riskLevel, setRiskLevel] =
    useState("SAFE");

  const [riskColor, setRiskColor] =
    useState("#22c55e");

  const [explanation, setExplanation] =
    useState("");

  const [recommendations,
    setRecommendations] =
    useState([]);

  // ANALYZE INPUT

  const handleAnalyze = () => {

    if (!input.trim()) {

      alert(
        "Please enter email, link, or message ❌"
      );

      return;
    }

    const text =
      input.toLowerCase().trim();

    // RESET INVALID STATE

    setIsInvalid(false);

    setInvalidMessage("");

    // INVALID INPUT DETECTION

    const words =
      text.split(/\s+/);

    const hasUrl =
      text.includes("http") ||
      text.includes(".com") ||
      text.includes(".net") ||
      text.includes(".org");

    const hasEmail =
      text.includes("@");

    const meaningfulLength =
      text.replace(/[^a-z]/g, "")
        .length;

    // RANDOM TEXT DETECTION

    if (

      meaningfulLength < 5 ||

      (
        words.length < 3 &&
        !hasUrl &&
        !hasEmail
      )

    ) {

      setAnalyzed(true);

      setIsInvalid(true);

      setInvalidMessage(
        "Invalid or insufficient security content detected. Please enter a real email, message, or suspicious link."
      );

      setThreats([]);

      setScore(0);

      setRiskLevel("INVALID");

      setRiskColor("#9ca3af");

      setExplanation("");

      setRecommendations([]);

      return;
    }

    // START ANALYSIS

    let detectedThreats = [];

    let totalScore = 0;

    let aiRecommendations = [];

    let aiExplanation = "";

    // PHISHING KEYWORDS

    const keywordChecks = [

      {
        word: "urgent",
        risk: 15,
        reason:
          "Urgency manipulation detected.",
      },

      {
        word: "verify",
        risk: 15,
        reason:
          "Verification request detected.",
      },

      {
        word: "click here",
        risk: 20,
        reason:
          "Suspicious call-to-action detected.",
      },

      {
        word: "bank",
        risk: 15,
        reason:
          "Financial impersonation attempt.",
      },

      {
        word: "otp",
        risk: 20,
        reason:
          "Sensitive OTP request detected.",
      },

      {
        word: "password",
        risk: 20,
        reason:
          "Credential harvesting indicator.",
      },

      {
        word: "crypto",
        risk: 15,
        reason:
          "Possible crypto scam pattern.",
      },

      {
        word: "free money",
        risk: 25,
        reason:
          "Reward scam pattern detected.",
      },

      {
        word: "login",
        risk: 15,
        reason:
          "Suspicious login request detected.",
      },

      {
        word: "suspended",
        risk: 15,
        reason:
          "Fear-based manipulation tactic.",
      },

      {
        word: "immediately",
        risk: 10,
        reason:
          "Pressure-based language detected.",
      },
    ];

    keywordChecks.forEach((item) => {

      if (
        text.includes(item.word)
      ) {

        detectedThreats.push(
          item.reason
        );

        totalScore += item.risk;
      }
    });

    // URL DETECTION

    if (
      text.includes("http://")
    ) {

      detectedThreats.push(
        "Unsafe HTTP protocol detected."
      );

      totalScore += 25;
    }

    // SHORT URL DETECTION

    if (

      text.includes("bit.ly") ||
      text.includes("tinyurl") ||
      text.includes("shorturl")

    ) {

      detectedThreats.push(
        "Shortened URL detected."
      );

      totalScore += 20;
    }

    // IP ADDRESS DETECTION

    const ipRegex =
      /\b\d{1,3}(\.\d{1,3}){3}\b/;

    if (
      ipRegex.test(text)
    ) {

      detectedThreats.push(
        "IP-based suspicious link detected."
      );

      totalScore += 30;
    }

    // SOCIAL ENGINEERING DETECTION

    if (

      text.includes("account suspended") ||
      text.includes("verify now") ||
      text.includes("limited time")

    ) {

      detectedThreats.push(
        "Social engineering behavior detected."
      );

      totalScore += 20;
    }

    // SAFE CONTENT DETECTION

    if (
      totalScore === 0
    ) {

      aiExplanation =
        "No major phishing indicators detected. The content appears relatively safe based on current cyber threat analysis.";

      aiRecommendations = [

        "Content appears relatively safe.",

        "Continue practicing cyber awareness.",

        "Always verify unknown links before clicking.",

        "Enable multi-factor authentication for better security.",
      ];

    }

    // LOW RISK

    else if (
      totalScore < 40
    ) {

      aiExplanation =
        "Minor suspicious indicators detected. Proceed carefully and verify sender authenticity before interacting.";

      aiRecommendations = [

        "Do not share passwords or OTPs.",

        "Verify the sender identity.",

        "Avoid clicking unknown links.",
      ];
    }

    // MEDIUM RISK

    else if (
      totalScore < 70
    ) {

      aiExplanation =
        "This content contains suspicious phishing indicators and possible social engineering tactics.";

      aiRecommendations = [

        "Avoid clicking suspicious links.",

        "Check official website manually.",

        "Do not download attachments from unknown sources.",

        "Enable MFA protection.",
      ];
    }

    // HIGH RISK

    else {

      aiExplanation =
        "Highly dangerous phishing behavior detected including credential harvesting, urgency manipulation, and suspicious cyber attack patterns.";

      aiRecommendations = [

        "Do NOT interact with this content.",

        "Avoid entering passwords or OTPs.",

        "Report suspicious email immediately.",

        "Block sender and delete message.",

        "Run additional malware checks if links were opened.",
      ];
    }

    // RISK LEVEL

    let level = "SAFE";

    let color = "#22c55e";

    if (
      totalScore >= 70
    ) {

      level = "HIGHLY DANGEROUS";

      color = "#ef4444";

    } else if (
      totalScore >= 40
    ) {

      level = "SUSPICIOUS";

      color = "#f59e0b";

    } else if (
      totalScore > 0
    ) {

      level = "LOW RISK";

      color = "#3b82f6";
    }

    // LIMIT SCORE

    if (
      totalScore > 100
    ) {

      totalScore = 100;
    }

    // UPDATE STATES

    setThreats(
      detectedThreats
    );

    setScore(
      totalScore
    );

    setRiskLevel(
      level
    );

    setRiskColor(
      color
    );

    setExplanation(
      aiExplanation
    );

    setRecommendations(
  aiRecommendations
);

setAnalyzed(true);

// ======================
// SAVE PHISHING SCAN
// ======================

const scanData = {

  id: Date.now(),

  type: "Phishing Scan",

  score: totalScore,

  risk: level,

  timestamp:
    new Date()
      .toLocaleString(),
};

// ======================
// GET EXISTING SCANS
// ======================

const existingScans =
  JSON.parse(
    localStorage.getItem(
      "securex_scans"
    )
  ) || [];

// ======================
// ADD NEW SCAN
// ======================

existingScans.push(
  scanData
);

// ======================
// SAVE UPDATED STORAGE
// ======================

localStorage.setItem(

  "securex_scans",

  JSON.stringify(
    existingScans
  )
);
  };

  // CLEAR FUNCTION

  const handleClear = () => {

    setInput("");

    setAnalyzed(false);

    setThreats([]);

    setScore(0);

    setIsInvalid(false);

    setInvalidMessage("");
  };

  return (

    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${bg})`,
      }}
    >

      <div style={styles.overlay}>

        {/* HEADER */}

        <div style={styles.header}>

          <div style={styles.badge}>
            SecureX AI • Phishing Intelligence Engine
          </div>

          <h1 style={styles.title}>
            AI Phishing Intelligence
          </h1>

          <p style={styles.desc}>
            Detect phishing attacks,
            suspicious links,
            social engineering,
            fake login attempts,
            and scam messages using
            AI-powered cyber analysis.
          </p>

        </div>

        {/* INPUT CARD */}

        <div style={styles.mainCard}>

          <h2 style={styles.sectionTitle}>
            Enter Email, Link, or Message
          </h2>

          <textarea
            placeholder="Paste suspicious email, message, or URL..."
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            style={styles.textarea}
          />

          <div style={styles.buttonRow}>

            <button
              style={styles.analyzeBtn}
              onClick={handleAnalyze}
            >
              🔍 Analyze Threat
            </button>

            <button
              style={styles.clearBtn}
              onClick={handleClear}
            >
              🗑 Clear
            </button>

          </div>

        </div>

        {/* WAITING */}

        {!analyzed ? (

          <div style={styles.waitingCard}>
            🎣 Waiting for phishing intelligence scan...
          </div>

        ) : isInvalid ? (

          <div style={styles.invalidCard}>
            ❌ {invalidMessage}
          </div>

        ) : (

          <>

            {/* SCORE */}

            <div style={styles.resultCard}>

              <div style={styles.progressContainer}>

                <div
                  style={{
                    ...styles.progressBar,
                    width: `${score}%`,
                    background: riskColor,
                  }}
                />

              </div>

              <div style={styles.scoreRow}>

                <div>

                  <h3 style={styles.metricTitle}>
                    Threat Score
                  </h3>

                  <div
                    style={{
                      ...styles.metricValue,
                      color: riskColor,
                    }}
                  >
                    {score}/100
                  </div>

                </div>

                <div>

                  <h3 style={styles.metricTitle}>
                    Risk Level
                  </h3>

                  <div
                    style={{
                      ...styles.metricValue,
                      color: riskColor,
                    }}
                  >
                    {riskLevel}
                  </div>

                </div>

              </div>

            </div>

            {/* AI EXPLANATION */}

            <div style={styles.section}>

              <h2 style={styles.heading}>
                AI Threat Explanation
              </h2>

              <div style={styles.infoCard}>
                🤖 {explanation}
              </div>

            </div>

            {/* THREATS */}

            <div style={styles.section}>

              <h2 style={styles.heading}>
                Detected Threat Indicators
              </h2>

              {threats.length > 0 ? (

                threats.map(
                  (
                    threat,
                    index
                  ) => (

                    <div
                      key={index}
                      style={styles.threatCard}
                    >
                      ⚠️ {threat}
                    </div>
                  )
                )

              ) : (

                <div style={styles.safeCard}>
                  ✅ No major phishing indicators detected.
                </div>

              )}

            </div>

            {/* RECOMMENDATIONS */}

            <div style={styles.section}>

              <h2 style={styles.heading}>
                AI Cyber Recommendations
              </h2>

              {recommendations.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    style={styles.recommendCard}
                  >
                    🔐 {item}
                  </div>
                )
              )}

            </div>

          </>

        )}

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "40px 20px",
  },

  overlay: {
    background:
      "rgba(0,0,0,0.65)",
    minHeight: "100vh",
    padding: "20px",
  },

  header: {
    textAlign: "center",
    marginBottom: "50px",
    color: "white",
  },

  badge: {
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: "30px",
    background:
      "rgba(239,68,68,0.15)",
    border:
      "1px solid rgba(239,68,68,0.35)",
    color: "#fca5a5",
    fontWeight: "600",
    marginBottom: "20px",
  },

  title: {
    fontSize: "60px",
    fontWeight: "800",
    marginBottom: "20px",
  },

  desc: {
    maxWidth: "950px",
    margin: "auto",
    fontSize: "22px",
    lineHeight: "1.8",
    color: "#d1d5db",
  },

  mainCard: {
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "25px",
    padding: "40px",
    maxWidth: "1100px",
    margin: "auto",
    marginBottom: "40px",
  },

  sectionTitle: {
    color: "white",
    fontSize: "32px",
    marginBottom: "25px",
  },

  textarea: {
    width: "100%",
    minHeight: "220px",
    borderRadius: "18px",
    border: "none",
    padding: "20px",
    fontSize: "18px",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    marginBottom: "25px",
    outline: "none",
  },

  buttonRow: {
    display: "flex",
    gap: "15px",
  },

  analyzeBtn: {
    padding: "16px 28px",
    borderRadius: "14px",
    border: "none",
    background: "#ef4444",
    color: "white",
    fontWeight: "700",
    fontSize: "17px",
    cursor: "pointer",
  },

  clearBtn: {
    padding: "16px 28px",
    borderRadius: "14px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "700",
    fontSize: "17px",
    cursor: "pointer",
  },

  waitingCard: {
    maxWidth: "1100px",
    margin: "auto",
    background:
      "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "18px",
    textAlign: "center",
    color: "#d1d5db",
    fontSize: "20px",
  },

  invalidCard: {
    maxWidth: "1100px",
    margin: "auto",
    background:
      "rgba(239,68,68,0.15)",
    border:
      "1px solid rgba(239,68,68,0.35)",
    color: "#fecaca",
    padding: "25px",
    borderRadius: "18px",
    textAlign: "center",
    fontSize: "20px",
  },

  resultCard: {
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "25px",
    padding: "40px",
    maxWidth: "1100px",
    margin: "auto",
    marginBottom: "40px",
  },

  progressContainer: {
    width: "100%",
    height: "16px",
    background:
      "rgba(255,255,255,0.1)",
    borderRadius: "20px",
    overflow: "hidden",
    marginBottom: "35px",
  },

  progressBar: {
    height: "100%",
    transition: "0.4s",
  },

  scoreRow: {
    display: "flex",
    justifyContent:
      "space-between",
    flexWrap: "wrap",
  },

  metricTitle: {
    color: "#d1d5db",
    fontSize: "20px",
    marginBottom: "10px",
  },

  metricValue: {
    fontSize: "48px",
    fontWeight: "800",
  },

  section: {
    maxWidth: "1100px",
    margin: "auto",
    marginBottom: "40px",
  },

  heading: {
    color: "white",
    fontSize: "38px",
    marginBottom: "25px",
  },

  infoCard: {
    background:
      "rgba(59,130,246,0.15)",
    border:
      "1px solid rgba(59,130,246,0.3)",
    color: "#bfdbfe",
    padding: "22px",
    borderRadius: "18px",
    lineHeight: "1.8",
    fontSize: "18px",
  },

  threatCard: {
    background:
      "rgba(239,68,68,0.15)",
    border:
      "1px solid rgba(239,68,68,0.3)",
    color: "#fecaca",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "15px",
    fontSize: "18px",
  },

  safeCard: {
    background:
      "rgba(34,197,94,0.15)",
    border:
      "1px solid rgba(34,197,94,0.35)",
    color: "#86efac",
    padding: "20px",
    borderRadius: "16px",
    fontSize: "18px",
  },

  recommendCard: {
    background:
      "rgba(59,130,246,0.15)",
    border:
      "1px solid rgba(59,130,246,0.3)",
    color: "#bfdbfe",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "15px",
    fontSize: "18px",
  },
};

export default PhishingCheck;