import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.png";

function Register() {

  const navigate = useNavigate();

  // STATES
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [showTerms, setShowTerms] = useState(false);

  // REGISTER FUNCTION
  const handleRegister = async () => {

    // VALIDATION
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password
    ) {
      alert("Please fill all fields ❌");
      return;
    }

    // TERMS CHECK
    if (!termsAccepted) {
      alert("Please accept Terms & Conditions ❌");
      return;
    }

    try {

      const response = await fetch(
        "https://securex-backend-mlm3.onrender.com/api/auth/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            firstName,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      // SUCCESS
      if (response.ok) {

        alert("Registration Successful ✅");

        navigate("/options");

      } else {

        // BACKEND ERROR MESSAGE
        alert(data.message);
      }

    } catch (error) {

      console.log(error);

      alert("Server Error ❌");
    }
  };

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `url(${bg})`,
      }}
    >

      <div style={styles.overlay}>

        {/* REGISTER CARD */}
        <div style={styles.card}>

          <h1 style={styles.title}>
            Register
          </h1>

          {/* FIRST NAME */}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) =>
              setFirstName(e.target.value)
            }
            style={styles.input}
          />

          {/* LAST NAME */}
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) =>
              setLastName(e.target.value)
            }
            style={styles.input}
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

          {/* TERMS */}
          <label style={styles.checkboxContainer}>

            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) =>
                setTermsAccepted(e.target.checked)
              }
            />

            <span>
              I agree to the{" "}

              <span
                style={styles.link}
                onClick={() => setShowTerms(true)}
              >
                Terms & Conditions
              </span>

            </span>

          </label>

          {/* REGISTER BUTTON */}
          <button
            style={styles.button}
            onClick={handleRegister}
          >
            Register
          </button>

          {/* LOGIN */}
          <p style={styles.loginText}>
            Already have an account?
          </p>

          <button
            style={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

        {/* TERMS MODAL */}
        {showTerms && (

          <div style={styles.modalOverlay}>

            <div style={styles.modal}>

              <h2 style={styles.modalTitle}>
                SecureX Terms & Conditions
              </h2>

              <div style={styles.termsContent}>

                <p>
                  1. SecureX provides cybersecurity tools
                  for educational and informational purposes.
                </p>

                <p>
                  2. Users must not misuse the platform
                  for illegal or harmful activities.
                </p>

                <p>
                  3. SecureX does not guarantee complete
                  protection from cyber threats.
                </p>

                <p>
                  4. User information is securely stored.
                </p>

                <p>
                  5. Users are responsible for maintaining
                  their own account security.
                </p>

                <p>
                  6. SecureX may update services and features
                  without prior notice.
                </p>

              </div>

              <button
                style={styles.closeBtn}
                onClick={() => setShowTerms(false)}
              >
                Close
              </button>

            </div>

          </div>

        )}

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
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "500px",
    background: "rgba(0,0,0,0.72)",
    padding: "40px",
    borderRadius: "22px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },

  title: {
    textAlign: "center",
    fontSize: "42px",
    marginBottom: "10px",
  },

  input: {
    padding: "15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    outline: "none",
  },

  checkboxContainer: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    fontSize: "15px",
  },

  link: {
    color: "#60a5fa",
    cursor: "pointer",
    textDecoration: "underline",
  },

  button: {
    padding: "15px",
    border: "none",
    borderRadius: "10px",
    background: "#22c55e",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    fontWeight: "600",
  },

  loginText: {
    textAlign: "center",
    marginTop: "10px",
  },

  loginBtn: {
    background: "transparent",
    border: "none",
    color: "#60a5fa",
    cursor: "pointer",
    fontSize: "16px",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.75)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "600px",
    background: "#111827",
    padding: "30px",
    borderRadius: "20px",
    color: "white",
  },

  modalTitle: {
    marginBottom: "20px",
    fontSize: "30px",
  },

  termsContent: {
    maxHeight: "300px",
    overflowY: "auto",
    lineHeight: "1.8",
    marginBottom: "25px",
  },

  closeBtn: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    background: "#ef4444",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Register;