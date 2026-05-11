import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import bg from "../assets/bg3.jpg";

function PasswordCheck() {

  const [password, setPassword] = useState("");

  const [analyzed, setAnalyzed] =
    useState(false);

  const [result, setResult] =
    useState(null);

  // ANALYZE PASSWORD

  const handleAnalyze = () => {

    if (!password.trim()) {

      alert(
        "Please enter a password first ❌"
      );

      return;
    }

    const analysis = zxcvbn(password);

setResult(analysis);

setAnalyzed(true);

// ======================
// SECURITY SCORE
// ======================

const score =
  analysis.score * 25;

// ======================
// RISK LEVEL
// ======================

let risk = "LOW";

if (score < 50) {

  risk = "HIGH";

} else if (score < 75) {

  risk = "MEDIUM";
}

// ======================
// SCAN DATA
// ======================

const scanData = {

  id: Date.now(),

  type: "Password Scan",

  score: score,

  risk: risk,

  timestamp:
    new Date()
      .toLocaleString(),
};

// ======================
// EXISTING STORAGE
// ======================

const existingScans =
  JSON.parse(
    localStorage.getItem(
      "securex_scans"
    )
  ) || [];

// ======================
// SAVE NEW SCAN
// ======================

existingScans.push(
  scanData
);

// ======================
// UPDATE STORAGE
// ======================

localStorage.setItem(

  "securex_scans",

  JSON.stringify(
    existingScans
  )
);
  };

  // CLEAR PASSWORD

  const handleClear = () => {

    setPassword("");

    setAnalyzed(false);

    setResult(null);
  };

  // RECHECK PASSWORD

  const handleRecheck = () => {

    setAnalyzed(false);

    setResult(null);
  };

  // DEFAULT VALUES

  let score = 0;

  let entropy = 0;

  let crackTime =
    "Waiting for analysis...";

  let feedback = [];

  let riskLevel = "WAITING";

  let riskColor = "#9ca3af";

  let detectedPatterns = [];

  // AFTER ANALYSIS

  if (analyzed && result) {

    score = result.score * 25;

    entropy =
      password.length * 4;

    crackTime =
      result.crack_times_display
        .offline_slow_hashing_1e4_per_second;

    // AI FEEDBACK ENGINE

    feedback = [];

    // LENGTH CHECK

    if (password.length < 8) {

      feedback.push(
        "Increase password length to at least 8-12 characters."
      );
    }

    // UPPERCASE CHECK

    if (!/[A-Z]/.test(password)) {

      feedback.push(
        "Add uppercase letters for stronger security."
      );
    }

    // LOWERCASE CHECK

    if (!/[a-z]/.test(password)) {

      feedback.push(
        "Include lowercase characters."
      );
    }

    // NUMBER CHECK

    if (!/[0-9]/.test(password)) {

      feedback.push(
        "Use numbers to improve password complexity."
      );
    }

    // SPECIAL CHARACTER CHECK

    if (!/[!@#$%^&*()_+[\]{};':"\\|,.<>/?]/.test(password)) {

      feedback.push(
        "Add special symbols like @, #, $, or !."
      );
    }

    // COMMON PASSWORD CHECK

    const weakWords = [
      "password",
      "admin",
      "qwerty",
      "123456",
      "welcome",
    ];

    for (let word of weakWords) {

      if (
        password.toLowerCase()
          .includes(word)
      ) {

        feedback.push(
          "Avoid common password words and predictable phrases."
        );

        break;
      }
    }

    // FINAL SAFE MESSAGE

    if (feedback.length === 0) {

      feedback.push(
        "Excellent password security detected."
      );

      feedback.push(
        "Your password has strong complexity and attack resistance."
      );
    }

    // RISK LEVEL

    riskLevel = "LOW";

    riskColor = "#22c55e";

    if (score < 50) {

      riskLevel = "HIGH";

      riskColor = "#ef4444";

    } else if (score < 75) {

      riskLevel = "MEDIUM";

      riskColor = "#f59e0b";
    }

    // PATTERN DETECTION

    if (
      password.includes("123")
    ) {

      detectedPatterns.push(
        "Sequential numeric pattern detected"
      );
    }

    if (
      password.toLowerCase()
        .includes("qwerty")
    ) {

      detectedPatterns.push(
        "Keyboard pattern detected"
      );
    }

    if (
      /(.)\1{2,}/.test(password)
    ) {

      detectedPatterns.push(
        "Repeated character sequence detected"
      );
    }
  }

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
            SecureX AI • Password Intelligence Engine
          </div>

          <h1 style={styles.title}>
            Password Intelligence Engine
          </h1>

          <p style={styles.desc}>
            Analyze password entropy,
            crack time, attack resistance,
            security patterns, and cyber risk
            using AI-powered intelligence.
          </p>

        </div>

        {/* MAIN CARD */}

        <div style={styles.mainCard}>

          <h2 style={styles.sectionTitle}>
            Enter Password for Analysis
          </h2>

          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            style={styles.input}
          />

          {/* BUTTONS */}

          <div style={styles.buttonRow}>

            <button
              style={styles.analyzeBtn}
              onClick={handleAnalyze}
            >
              🔍 Analyze Password
            </button>

            <button
              style={styles.clearBtn}
              onClick={handleClear}
            >
              🗑 Clear
            </button>

            <button
              style={styles.recheckBtn}
              onClick={handleRecheck}
            >
              🔄 Recheck
            </button>

          </div>

        </div>

        {/* WAITING STATE */}

        {!analyzed ? (

          <div style={styles.waitingSection}>

            <div style={styles.waitingCard}>

              🔐 Waiting for password intelligence scan...

            </div>

          </div>

        ) : (

          <>

            {/* RESULTS */}

            <div style={styles.mainCard}>

              {/* PROGRESS BAR */}

              <div
                style={
                  styles.progressContainer
                }
              >

                <div
                  style={{
                    ...styles.progressBar,
                    width: `${score}%`,
                    background: riskColor,
                  }}
                />

              </div>

              {/* SCORE ROW */}

              <div style={styles.scoreRow}>

                <div>

                  <h3
                    style={
                      styles.metricTitle
                    }
                  >
                    Security Score
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

                  <h3
                    style={
                      styles.metricTitle
                    }
                  >
                    Threat Level
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

            {/* ANALYTICS */}

            <div
              style={
                styles.analyticsGrid
              }
            >

              <div
                style={
                  styles.analyticsCard
                }
              >

                <h3
                  style={
                    styles.cardHeading
                  }
                >
                  Entropy Analysis
                </h3>

                <div
                  style={styles.bigValue}
                >
                  {entropy} bits
                </div>

                <p style={styles.cardText}>
                  Entropy measures
                  randomness and attack
                  resistance.
                </p>

              </div>

              <div
                style={
                  styles.analyticsCard
                }
              >

                <h3
                  style={
                    styles.cardHeading
                  }
                >
                  Estimated Crack Time
                </h3>

                <div
                  style={styles.bigValue}
                >
                  {crackTime}
                </div>

                <p style={styles.cardText}>
                  Estimated time required
                  for brute-force attacks.
                </p>

              </div>

            </div>

            {/* PATTERNS */}

            <div
              style={
                styles.patternSection
              }
            >

              <h2
                style={
                  styles.sectionHeading
                }
              >
                Detected Security Patterns
              </h2>

              {detectedPatterns.length >
              0 ? (

                detectedPatterns.map(
                  (
                    pattern,
                    index
                  ) => (

                    <div
                      key={index}
                      style={
                        styles.patternCard
                      }
                    >
                      ⚠️ {pattern}
                    </div>
                  )
                )

              ) : (

                <div
                  style={styles.safeCard}
                >
                  ✅ No dangerous
                  password patterns
                  detected.
                </div>

              )}

            </div>

            {/* RECOMMENDATIONS */}

            <div
              style={
                styles.recommendSection
              }
            >

              <h2
                style={
                  styles.sectionHeading
                }
              >
                AI Security
                Recommendations
              </h2>

              {feedback.map(
                (item, index) => (

                  <div
                    key={index}
                    style={
                      styles.recommendCard
                    }
                  >
                    🔐 {item}
                  </div>
                )
              )}

            </div>

            {/* INSIGHTS */}

            <div
              style={
                styles.insightSection
              }
            >

              <h2
                style={
                  styles.sectionHeading
                }
              >
                Security Insights
              </h2>

              <div
                style={
                  styles.insightGrid
                }
              >

                <div
                  style={
                    styles.insightCard
                  }
                >

                  <h3>
                    Password Resistance
                  </h3>

                  <p>
                    Strong passwords
                    resist brute-force,
                    dictionary, and
                    credential stuffing
                    attacks.
                  </p>

                </div>

                <div
                  style={
                    styles.insightCard
                  }
                >

                  <h3>
                    Credential Safety
                  </h3>

                  <p>
                    Avoid password reuse
                    across platforms to
                    reduce breach
                    exposure risks.
                  </p>

                </div>

                <div
                  style={
                    styles.insightCard
                  }
                >

                  <h3>
                    AI Intelligence
                  </h3>

                  <p>
                    SecureX AI analyzes
                    password complexity,
                    entropy, and attack
                    resistance in real
                    time.
                  </p>

                </div>

              </div>

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
    backgroundAttachment: "fixed",
    padding: "40px 20px",
  },

  overlay: {
    minHeight: "100vh",
    background:
      "rgba(0,0,0,0.6)",
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
      "rgba(34,197,94,0.15)",
    border:
      "1px solid rgba(34,197,94,0.35)",
    color: "#4ade80",
    fontWeight: "600",
    marginBottom: "25px",
  },

  title: {
    fontSize: "62px",
    fontWeight: "800",
    marginBottom: "18px",
  },

  desc: {
    fontSize: "22px",
    color: "#d1d5db",
    maxWidth: "1000px",
    margin: "auto",
    lineHeight: "1.8",
  },

  mainCard: {
    background:
      "rgba(0,0,0,0.58)",
    borderRadius: "28px",
    padding: "40px",
    maxWidth: "1100px",
    margin: "auto",
    marginBottom: "40px",
    border:
      "1px solid rgba(255,255,255,0.1)",
  },

  sectionTitle: {
    color: "white",
    fontSize: "32px",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "20px",
    borderRadius: "16px",
    border: "none",
    fontSize: "20px",
    marginBottom: "30px",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
  },

  buttonRow: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },

  analyzeBtn: {
    padding: "16px 28px",
    borderRadius: "14px",
    border: "none",
    background: "#22c55e",
    color: "white",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },

  clearBtn: {
    padding: "16px 28px",
    borderRadius: "14px",
    border: "none",
    background: "#ef4444",
    color: "white",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },

  recheckBtn: {
    padding: "16px 28px",
    borderRadius: "14px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },

  waitingSection: {
    maxWidth: "1100px",
    margin: "auto",
  },

  waitingCard: {
    background:
      "rgba(255,255,255,0.06)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    color: "#d1d5db",
    padding: "25px",
    borderRadius: "18px",
    fontSize: "20px",
    textAlign: "center",
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
    gap: "20px",
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

  analyticsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
    maxWidth: "1100px",
    margin: "auto",
    marginBottom: "50px",
  },

  analyticsCard: {
    background:
      "rgba(0,0,0,0.58)",
    padding: "35px",
    borderRadius: "24px",
    color: "white",
  },

  cardHeading: {
    fontSize: "28px",
    marginBottom: "18px",
  },

  bigValue: {
    fontSize: "42px",
    fontWeight: "800",
    color: "#22c55e",
    marginBottom: "15px",
  },

  cardText: {
    color: "#d1d5db",
    lineHeight: "1.7",
  },

  patternSection: {
    maxWidth: "1100px",
    margin: "auto",
    marginBottom: "50px",
  },

  sectionHeading: {
    color: "white",
    fontSize: "40px",
    marginBottom: "25px",
  },

  patternCard: {
    background:
      "rgba(239,68,68,0.15)",
    border:
      "1px solid rgba(239,68,68,0.35)",
    color: "#fca5a5",
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

  recommendSection: {
    maxWidth: "1100px",
    margin: "auto",
    marginBottom: "50px",
  },

  recommendCard: {
    background:
      "rgba(59,130,246,0.12)",
    border:
      "1px solid rgba(59,130,246,0.3)",
    color: "#bfdbfe",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "15px",
    lineHeight: "1.7",
    fontSize: "18px",
  },

  insightSection: {
    maxWidth: "1100px",
    margin: "auto",
    paddingBottom: "50px",
  },

  insightGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "25px",
  },

  insightCard: {
    background:
      "rgba(0,0,0,0.58)",
    padding: "30px",
    borderRadius: "22px",
    color: "white",
    lineHeight: "1.8",
  },
};

export default PasswordCheck;