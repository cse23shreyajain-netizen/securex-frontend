import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";

function AuthChoice() {
  const navigate = useNavigate();

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${bg})` }}>
      <div style={styles.overlay}>

        <div style={styles.card}>
          <h1 style={styles.title}>Continue to SecureX</h1>

          <p style={styles.desc}>
            Login or create your account to continue your security analysis.
          </p>

          <div style={styles.btnGroup}>

            <button
              style={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              style={styles.registerBtn}
              onClick={() => navigate("/register")}
            >
              Register
            </button>

          </div>
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
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "550px",
    background: "rgba(0,0,0,0.65)",
    borderRadius: "25px",
    padding: "50px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
  },

  title: {
    fontSize: "45px",
    marginBottom: "20px",
  },

  desc: {
    fontSize: "20px",
    color: "#d1d5db",
    marginBottom: "40px",
  },

  btnGroup: {
    display: "flex",
    gap: "25px",
  },

  loginBtn: {
    flex: 1,
    padding: "18px",
    border: "none",
    borderRadius: "12px",
    background: "#22c55e",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
  },

  registerBtn: {
    flex: 1,
    padding: "18px",
    border: "none",
    borderRadius: "12px",
    background: "#2563eb",
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
  },
};

export default AuthChoice;