import React, { useEffect, useState } from "react";

import bg from "../assets/bg3.jpg";

function SecurityDashboard() {

  const [scans, setScans] =
    useState([]);

  const [healthScore,
    setHealthScore] =
    useState(100);

  const [riskLevel,
    setRiskLevel] =
    useState("SECURE");

  // LOAD SCANS

  useEffect(() => {

    const savedScans =
      JSON.parse(
        localStorage.getItem(
          "securex_scans"
        )
      ) || [];

    setScans(savedScans);

    calculateHealth(
      savedScans
    );

  }, []);

  // CALCULATE HEALTH SCORE

  const calculateHealth = (
    data
  ) => {

    if (
      data.length === 0
    ) {

      setHealthScore(100);

      setRiskLevel(
        "SECURE"
      );

      return;
    }

    let total = 0;

    data.forEach((scan) => {

      if (
        scan.type ===
        "Password Scan"
      ) {

        total +=
          scan.score;

      } else {

        total +=
          100 -
          scan.score;
      }
    });

    const average =
      Math.floor(
        total /
        data.length
      );

    setHealthScore(
      average
    );

    // RISK LEVEL

    if (
      average >= 80
    ) {

      setRiskLevel(
        "SECURE"
      );

    } else if (
      average >= 60
    ) {

      setRiskLevel(
        "MODERATE"
      );

    } else if (
      average >= 40
    ) {

      setRiskLevel(
        "VULNERABLE"
      );

    } else {

      setRiskLevel(
        "CRITICAL"
      );
    }
  };

  // COLORS

  let healthColor =
    "#22c55e";

  if (
    healthScore < 80
  ) {

    healthColor =
      "#f59e0b";
  }

  if (
    healthScore < 60
  ) {

    healthColor =
      "#ef4444";
  }

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
            SecureX AI • Security Risk Dashboard
          </div>

          <h1 style={styles.title}>
            Cyber Health Dashboard
          </h1>

          <p style={styles.desc}>
            Monitor your overall cyber health,
            security activity,
            phishing risks,
            password intelligence,
            and security posture
            in one unified dashboard.
          </p>

        </div>

        {/* HEALTH CARD */}

        <div style={styles.healthCard}>

          <h2 style={styles.healthTitle}>
            Overall Cyber Health
          </h2>

          <div
            style={{
              ...styles.healthScore,
              color:
                healthColor,
            }}
          >
            {healthScore}/100
          </div>

          <div
            style={{
              ...styles.riskBadge,
              background:
                healthColor,
            }}
          >
            {riskLevel}
          </div>

        </div>

        {/* STATS */}

        <div style={styles.statsGrid}>

          <div style={styles.statCard}>

            <h3>
              Total Security Scans
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

        {/* RECENT ACTIVITY */}

        <div style={styles.activitySection}>

          <h2 style={styles.sectionTitle}>
            Recent Security Activity
          </h2>

          {scans.length === 0 ? (

            <div style={styles.emptyCard}>
              No scans available yet.
            </div>

          ) : (

            scans
              .slice()
              .reverse()
              .slice(0, 8)
              .map(
                (
                  scan,
                  index
                ) => (

                  <div
                    key={index}
                    style={
                      styles.activityCard
                    }
                  >

                    <div>

                      <h3>
                        {scan.type}
                      </h3>

                      <p>
                        Risk:
                        {" "}
                        {scan.risk}
                      </p>

                    </div>

                    <div
                      style={
                        styles.activityRight
                      }
                    >

                      <div
                        style={
                          styles.activityScore
                        }
                      >
                        {scan.score}/100
                      </div>

                      <div
                        style={
                          styles.timestamp
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

const styles = {

  container: {
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition:
      "center",
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
      "rgba(59,130,246,0.15)",
    border:
      "1px solid rgba(59,130,246,0.35)",
    color: "#93c5fd",
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

  healthCard: {
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "30px",
    padding: "50px",
    textAlign: "center",
    maxWidth: "900px",
    margin: "auto",
    marginBottom: "50px",
  },

  healthTitle: {
    color: "white",
    fontSize: "36px",
    marginBottom: "25px",
  },

  healthScore: {
    fontSize: "90px",
    fontWeight: "800",
    marginBottom: "20px",
  },

  riskBadge: {
    display: "inline-block",
    padding: "12px 25px",
    borderRadius: "30px",
    color: "white",
    fontWeight: "700",
    fontSize: "18px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    maxWidth: "1200px",
    margin: "auto",
    marginBottom: "50px",
  },

  statCard: {
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "24px",
    padding: "35px",
    color: "white",
    textAlign: "center",
  },

  statValue: {
    fontSize: "55px",
    fontWeight: "800",
    marginTop: "15px",
    color: "#22c55e",
  },

  activitySection: {
    maxWidth: "1200px",
    margin: "auto",
  },

  sectionTitle: {
    color: "white",
    fontSize: "40px",
    marginBottom: "30px",
  },

  emptyCard: {
    background:
      "rgba(255,255,255,0.06)",
    padding: "25px",
    borderRadius: "20px",
    color: "#d1d5db",
    textAlign: "center",
  },

  activityCard: {
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "20px",
    padding: "25px",
    color: "white",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  activityRight: {
    textAlign: "right",
  },

  activityScore: {
    fontSize: "30px",
    fontWeight: "800",
    color: "#22c55e",
  },

  timestamp: {
    color: "#d1d5db",
    marginTop: "8px",
  },
};

export default SecurityDashboard;