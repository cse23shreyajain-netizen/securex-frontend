import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg2.jpg";

function Options() {
  const navigate = useNavigate();

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${bg})` }}>
      <div style={styles.overlay}>

        {/* SINGLE MAIN CARD */}
        <div style={styles.card}>
          <h1 style={styles.title}>
            Start Your Security Check
          </h1>

          <p style={styles.desc}>
            Analyze your password, email, links, and overall security risks in one place.
          </p>

          <button
            style={styles.button}
            onClick={() => navigate("/individual")}
          >
            Start Now →
          </button>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "500px",
    height: "350px",
    background: "rgba(0, 0, 0, 0.45)",
    borderRadius: "25px",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  title: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "20px",
    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
  },

  desc: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#d1d5db",
  },

  button: {
    padding: "16px 35px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};

export default Options;