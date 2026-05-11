import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import bg from "../assets/bg3.jpg";

function Individual() {

  const navigate =
    useNavigate();

  // ======================
  // STATES
  // ======================

  const [healthScore,
    setHealthScore] =
    useState(100);

  const [threatLevel,
    setThreatLevel] =
    useState("LOW");

  const [activeScans,
    setActiveScans] =
    useState(0);

  // ======================
  // LOAD DATA
  // ======================

  useEffect(() => {

    const scans =
      JSON.parse(
        localStorage.getItem(
          "securex_scans"
        )
      ) || [];

    setActiveScans(
      scans.length
    );

    if (
      scans.length === 0
    ) {

      setHealthScore(100);

      setThreatLevel(
        "LOW"
      );

      return;
    }

    let total = 0;

    scans.forEach((scan) => {

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
        scans.length
      );

    setHealthScore(
      average
    );

    if (
      average >= 80
    ) {

      setThreatLevel(
        "LOW"
      );

    } else if (
      average >= 60
    ) {

      setThreatLevel(
        "MODERATE"
      );

    } else {

      setThreatLevel(
        "HIGH"
      );
    }

  }, []);

  // ======================
  // CARDS
  // ======================

  const cards = [

    {
      title:
        "Password Intelligence Engine",

      desc:
        "Analyze password entropy, crack time, attack patterns, reused credentials, and overall password security using AI-powered intelligence.",

      path:
        "/password",

      color:
        "#22c55e",
    },

    {
      title:
        "AI Phishing Intelligence",

      desc:
        "Detect phishing emails, malicious links, scam messages, spoofing attempts, social engineering attacks, and suspicious cyber threats intelligently.",

      path:
        "/phishing",

      color:
        "#3b82f6",
    },

    {
      title:
        "AI Cyber Assistant",

      desc:
        "Interactive AI-powered cybersecurity assistant for phishing awareness, password guidance, scam prevention, malware education, and online safety.",

      path:
        "/assistant",

      color:
        "#a855f7",
    },

  ];

  return (

    <div
      style={{
        ...styles.container,
        backgroundImage:
          `url(${bg})`,
      }}
    >

      <div style={styles.overlay}>

        {/* TOP BAR */}

        <div style={styles.topBar}>

          <div />

          {/* PROFILE BUTTON */}

          <div
            style={styles.profileWrapper}

            onClick={() =>
              navigate(
                "/profile"
              )
            }
          >

            <div style={styles.profileCircle}>
              👤
            </div>

            <div style={styles.profileText}>
              My Profile
            </div>

          </div>

        </div>

        {/* HEADER */}

        <div style={styles.header}>

          <h1 style={styles.mainTitle}>
            Security Intelligence Center
          </h1>

          <p style={styles.mainDesc}>
            Monitor, analyze, and improve your cybersecurity posture using AI-powered threat intelligence, password analysis, phishing detection, advanced analytics, and intelligent cyber guidance.
          </p>

        </div>

        {/* DASHBOARD */}

        <div style={styles.topGrid}>

          <div style={styles.topCard}>

            <h3 style={styles.topTitle}>
              Cyber Health
            </h3>

            <div
              style={{
                ...styles.topValue,
                color:
                  "#22c55e",
              }}
            >
              {healthScore}/100
            </div>

            <p style={styles.topDesc}>
              Overall security posture based on scan analytics.
            </p>

          </div>

          <div style={styles.topCard}>

            <h3 style={styles.topTitle}>
              Threat Level
            </h3>

            <div
              style={{
                ...styles.topValue,
                color:
                  "#3b82f6",
              }}
            >
              {threatLevel}
            </div>

            <p style={styles.topDesc}>
              Threat intelligence generated from recent activity.
            </p>

          </div>

          <div style={styles.topCard}>

            <h3 style={styles.topTitle}>
              Active Scans
            </h3>

            <div
              style={{
                ...styles.topValue,
                color:
                  "#f97316",
                cursor:
                  "pointer",
              }}

              onClick={() =>
                navigate(
                  "/history"
                )
              }
            >
              {activeScans}
            </div>

            <p style={styles.topDesc}>
              Click to view security scan history.
            </p>

          </div>

        </div>

        {/* FEATURE CARDS */}

        <div style={styles.grid}>

          {cards.map(
            (card, index) => (

              <div
                key={index}
                style={styles.card}
              >

                <div
                  style={{
                    ...styles.line,
                    background:
                      card.color,
                  }}
                />

                <h2 style={styles.cardTitle}>
                  {card.title}
                </h2>

                <p style={styles.cardDesc}>
                  {card.desc}
                </p>

                <button
                  style={styles.button}

                  onClick={() =>
                    navigate(
                      card.path
                    )
                  }
                >
                  Launch System →
                </button>

              </div>
            )
          )}

        </div>

        {/* FOOTER */}

        <div style={styles.footer}>

          <h2 style={styles.footerTitle}>
            SecureX AI Cybersecurity Platform
          </h2>

          <p style={styles.footerText}>
            Advanced AI-powered cybersecurity dashboard for password intelligence, phishing detection, cyber awareness, intelligent protection systems, and smart security analytics.
          </p>

          <p style={styles.copy}>
            © 2026 SecureX. All Rights Reserved.
          </p>

        </div>

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
  },

  overlay: {
    minHeight: "100vh",
    background:
      "rgba(0,0,0,0.72)",
    padding: "30px",
  },

  topBar: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  profileWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    background:
      "rgba(255,255,255,0.08)",
    padding: "14px 22px",
    borderRadius: "18px",
    cursor: "pointer",
    border:
      "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(5px)",
  },

  profileCircle: {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background:
      "rgba(255,255,255,0.1)",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    fontSize: "28px",
  },

  profileText: {
    color: "white",
    fontSize: "18px",
    fontWeight: "700",
  },

  header: {
    textAlign: "center",
    marginBottom: "50px",
    color: "white",
  },

  mainTitle: {
    fontSize: "56px",
    fontWeight: "800",
    marginBottom: "20px",
  },

  mainDesc: {
    maxWidth: "1100px",
    margin: "auto",
    fontSize: "20px",
    lineHeight: "1.8",
    color: "#d1d5db",
  },

  topGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px",
    marginBottom: "50px",
  },

  topCard: {
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "22px",
    padding: "30px",
    color: "white",
  },

  topTitle: {
    fontSize: "28px",
    marginBottom: "15px",
  },

  topValue: {
    fontSize: "58px",
    fontWeight: "800",
    marginBottom: "15px",
  },

  topDesc: {
    color: "#d1d5db",
    lineHeight: "1.6",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "30px",
  },

  card: {
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "28px",
    padding: "35px",
    color: "white",
    minHeight: "320px",
  },

  line: {
    width: "70px",
    height: "6px",
    borderRadius: "20px",
    marginBottom: "30px",
  },

  cardTitle: {
    fontSize: "38px",
    fontWeight: "800",
    marginBottom: "22px",
  },

  cardDesc: {
    fontSize: "18px",
    color: "#d1d5db",
    lineHeight: "1.8",
    marginBottom: "30px",
  },

  button: {
    padding: "16px 24px",
    borderRadius: "14px",
    border: "none",
    background: "#22c55e",
    color: "white",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },

  footer: {
    marginTop: "70px",
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "24px",
    padding: "40px",
    textAlign: "center",
    color: "white",
  },

  footerTitle: {
    fontSize: "34px",
    fontWeight: "800",
    marginBottom: "18px",
  },

  footerText: {
    color: "#d1d5db",
    maxWidth: "900px",
    margin: "auto",
    lineHeight: "1.8",
    fontSize: "18px",
  },

  copy: {
    marginTop: "25px",
    color: "#9ca3af",
  },
};

export default Individual;