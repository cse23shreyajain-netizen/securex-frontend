import React, {
  useEffect,
  useState
} from "react";

import bg from "../assets/bg3.jpg";

function ScanHistory() {

  const [scans,
    setScans] =
    useState([]);

  // ======================
  // LOAD HISTORY
  // ======================

  useEffect(() => {

    const savedScans =
      JSON.parse(
        localStorage.getItem(
          "securex_scans"
        )
      ) || [];

    setScans(savedScans);

  }, []);

  // ======================
  // CLEAR HISTORY
  // ======================

  const clearHistory = () => {

    localStorage.removeItem(
      "securex_scans"
    );

    setScans([]);
  };

  return (

    <div
      style={{
        ...styles.container,
        backgroundImage:
          `url(${bg})`,
      }}
    >

      <div style={styles.overlay}>

        {/* HEADER */}

        <div style={styles.header}>

          <div style={styles.badge}>
            SecureX AI • Scan History
          </div>

          <h1 style={styles.title}>
            Security Scan History
          </h1>

          <p style={styles.desc}>
            View all previous password intelligence
            scans and phishing intelligence scans
            with timestamps, risk levels,
            and security analytics.
          </p>

        </div>

        {/* STATS */}

        <div style={styles.statsRow}>

          <div style={styles.statCard}>

            <h3>
              Total Scans
            </h3>

            <div style={styles.statValue}>
              {scans.length}
            </div>

          </div>

          <div style={styles.statCard}>

            <h3>
              Password Scans
            </h3>

            <div style={styles.statValue}>

              {
                scans.filter(
                  (scan) =>
                    scan.type ===
                    "Password Scan"
                ).length
              }

            </div>

          </div>

          <div style={styles.statCard}>

            <h3>
              Phishing Scans
            </h3>

            <div style={styles.statValue}>

              {
                scans.filter(
                  (scan) =>
                    scan.type ===
                    "Phishing Scan"
                ).length
              }

            </div>

          </div>

        </div>

        {/* CLEAR BUTTON */}

        {scans.length > 0 && (

          <div style={styles.clearContainer}>

            <button
              style={styles.clearBtn}
              onClick={
                clearHistory
              }
            >
              Clear History
            </button>

          </div>

        )}

        {/* HISTORY */}

        <div style={styles.historyContainer}>

          {scans.length === 0 ? (

            <div style={styles.emptyCard}>
              No scan history available yet.
            </div>

          ) : (

            scans
              .slice()
              .reverse()
              .map(
                (
                  scan,
                  index
                ) => (

                  <div
                    key={index}
                    style={
                      styles.historyCard
                    }
                  >

                    {/* LEFT */}

                    <div>

                      <h2
                        style={
                          styles.scanType
                        }
                      >
                        {scan.type}
                      </h2>

                      <p
                        style={
                          styles.scanText
                        }
                      >
                        Risk Level:
                        {" "}
                        {scan.risk}
                      </p>

                    </div>

                    {/* RIGHT */}

                    <div
                      style={
                        styles.rightSection
                      }
                    >

                      <div
                        style={
                          styles.score
                        }
                      >
                        {scan.score}/100
                      </div>

                      <div
                        style={
                          styles.time
                        }
                      >
                        {
                          scan.timestamp
                        }
                      </div>

                    </div>

                  </div>
                )
              )

          )}

        </div>

      </div>

    </div>
  );
}

// ======================
// STYLES
// ======================

const styles = {

  container: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition:
      "center",
    backgroundAttachment:
      "fixed",
  },

  overlay: {
    minHeight: "100vh",
    background:
      "rgba(0,0,0,0.72)",
    padding: "40px 20px",
  },

  header: {
    textAlign: "center",
    color: "white",
    marginBottom: "50px",
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
    marginBottom: "20px",
  },

  title: {
    fontSize: "60px",
    fontWeight: "800",
    marginBottom: "20px",
  },

  desc: {
    maxWidth: "1000px",
    margin: "auto",
    color: "#d1d5db",
    fontSize: "20px",
    lineHeight: "1.8",
  },

  statsRow: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
    maxWidth: "1300px",
    margin: "auto",
    marginBottom: "40px",
  },

  statCard: {
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "22px",
    padding: "30px",
    textAlign: "center",
    color: "white",
  },

  statValue: {
    fontSize: "55px",
    fontWeight: "800",
    marginTop: "15px",
    color: "#22c55e",
  },

  clearContainer: {
    textAlign: "center",
    marginBottom: "35px",
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

  historyContainer: {
    maxWidth: "1300px",
    margin: "auto",
  },

  emptyCard: {
    background:
      "rgba(255,255,255,0.06)",
    borderRadius: "20px",
    padding: "30px",
    textAlign: "center",
    color: "#d1d5db",
    fontSize: "20px",
  },

  historyCard: {
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "22px",
    padding: "28px",
    marginBottom: "20px",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  scanType: {
    fontSize: "28px",
    marginBottom: "12px",
  },

  scanText: {
    color: "#d1d5db",
    fontSize: "17px",
  },

  rightSection: {
    textAlign: "right",
  },

  score: {
    fontSize: "40px",
    fontWeight: "800",
    color: "#22c55e",
    marginBottom: "10px",
  },

  time: {
    color: "#9ca3af",
    fontSize: "15px",
  },
};

export default ScanHistory;