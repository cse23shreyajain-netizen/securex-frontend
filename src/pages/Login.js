import React, {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import axios from "axios";

import bg from "../assets/bg3.jpg";

function Login() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({

      email: "",

      password: "",
    });

  const [loading,
    setLoading] =
    useState(false);

  // ======================
  // INPUT CHANGE
  // ======================

  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,
    });
  };

  // ======================
  // LOGIN
  // ======================

  const handleLogin =
    async (e) => {

      e.preventDefault();

      setLoading(true);

      try {

        const response =
          await axios.post(

            "https://securex-backend-mlm3.onrender.com",

            formData
          );

        const data =
          response.data;

        // STORE TOKEN

        localStorage.setItem(

          "token",

          data.token
        );

        // STORE USER

        localStorage.setItem(

          "user",

          JSON.stringify({

            name:
              data.name ||

              "SecureX User",

            // IMPORTANT FIX

            email:
              formData.email,
          })
        );

        alert(
          "Login Successful ✅"
        );

        navigate(
          "/individual"
        );

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data
            ?.message ||

          "Login Failed ❌"
        );

      } finally {

        setLoading(false);
      }
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

        <div style={styles.card}>

          <h1 style={styles.title}>
            Welcome Back
          </h1>

          <p style={styles.subtitle}>
            Login to SecureX AI Cybersecurity Platform
          </p>

          {/* FORM */}

          <form
            onSubmit={
              handleLogin
            }
          >

            {/* EMAIL */}

            <input
              type="email"

              name="email"

              placeholder="Enter Email"

              value={
                formData.email
              }

              onChange={
                handleChange
              }

              style={
                styles.input
              }

              required
            />

            {/* PASSWORD */}

            <input
              type="password"

              name="password"

              placeholder="Enter Password"

              value={
                formData.password
              }

              onChange={
                handleChange
              }

              style={
                styles.input
              }

              required
            />

            {/* BUTTON */}

            <button
              type="submit"

              style={
                styles.button
              }

              disabled={loading}
            >

              {loading

                ? "Logging In..."

                : "Login"}

            </button>

          </form>

          <p style={styles.bottomText}>

            Don't have an account?

            {" "}

            <Link
              to="/register"

              style={
                styles.link
              }
            >
              Register
            </Link>

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
    backgroundPosition:
      "center",
    backgroundAttachment:
      "fixed",
  },

  overlay: {
    minHeight: "100vh",
    background:
      "rgba(0,0,0,0.72)",
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "28px",
    padding: "45px",
    color: "white",
  },

  title: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "15px",
    textAlign: "center",
  },

  subtitle: {
    color: "#d1d5db",
    textAlign: "center",
    marginBottom: "35px",
  },

  input: {
    width: "100%",
    padding: "18px",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    marginBottom: "20px",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: "16px",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "18px",
    borderRadius: "14px",
    border: "none",
    background: "#22c55e",
    color: "white",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
  },

  bottomText: {
    textAlign: "center",
    marginTop: "25px",
    color: "#d1d5db",
  },

  link: {
    color: "#22c55e",
    textDecoration: "none",
    fontWeight: "700",
  },
};

export default Login;