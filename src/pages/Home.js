import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${bg})` }}>
      <div style={styles.overlay}>

        <h1 style={styles.title}>
          Welcome to <span style={styles.highlight}>SecureX</span>
        </h1>

        <p style={styles.subtitle}>
          Your Digital Safety Starts Here 🔐
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/auth")}
        >
          Let’s Begin →
        </button>

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
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  title: {
    fontSize: "80px",
    color: "white",
    fontWeight: "700",
    marginBottom: "20px",
    textShadow: "0 4px 15px rgba(0,0,0,0.8)",
  },

  highlight: {
    color: "#22c55e",
  },

  subtitle: {
    fontSize: "42px",
    color: "white",
    marginBottom: "40px",
  },

  button: {
    padding: "18px 45px",
    fontSize: "22px",
    border: "none",
    borderRadius: "12px",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default Home;