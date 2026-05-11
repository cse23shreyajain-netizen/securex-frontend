import React, {
  useState
} from "react";

import bg from "../assets/bg3.jpg";

function CyberAssistant() {

  const [input,
    setInput] =
    useState("");

  const [messages,
    setMessages] =
    useState([
      {
        sender: "ai",

        text:
          "Hello 👋 I am SecureX AI Cyber Assistant. Ask me anything about cybersecurity, phishing, passwords, malware, scams, or online safety.",
      },
    ]);

  // ======================
  // AI RESPONSE ENGINE
  // ======================

  const getAIResponse = (
    text
  ) => {

    const query =
      text.toLowerCase();

    // PASSWORDS

    if (

      query.includes(
        "password"
      ) ||

      query.includes(
        "strong password"
      )

    ) {

      return (
        "Use at least 12 characters including uppercase, lowercase, numbers, and symbols. Avoid predictable words and never reuse passwords across platforms."
      );
    }

    // PHISHING

    if (

      query.includes(
        "phishing"
      ) ||

      query.includes(
        "fake email"
      ) ||

      query.includes(
        "scam"
      )

    ) {

      return (
        "Phishing attacks attempt to steal sensitive information using fake emails, websites, or messages. Always verify sender identity and avoid clicking suspicious links."
      );
    }

    // OTP

    if (
      query.includes("otp")
    ) {

      return (
        "Never share OTPs with anyone. Legitimate companies never ask for OTP verification through calls, messages, or emails."
      );
    }

    // MALWARE

    if (
      query.includes(
        "malware"
      )
    ) {

      return (
        "Malware is malicious software designed to damage systems or steal information. Keep your antivirus updated and avoid downloading unknown files."
      );
    }

    // RANSOMWARE

    if (
      query.includes(
        "ransomware"
      )
    ) {

      return (
        "Ransomware encrypts your files and demands payment. Always maintain backups and avoid opening suspicious attachments."
      );
    }

    // MFA

    if (

      query.includes("mfa") ||

      query.includes(
        "multi factor"
      )

    ) {

      return (
        "Multi-factor authentication adds an extra security layer by requiring additional verification beyond passwords."
      );
    }

    // HACKERS

    if (
      query.includes(
        "hackers"
      )
    ) {

      return (
        "Hackers often exploit weak passwords, phishing scams, outdated software, and unsafe browsing behavior."
      );
    }

    // DEFAULT

    return (
      "I recommend practicing safe browsing, using strong passwords, enabling MFA, and avoiding suspicious links or unknown downloads."
    );
  };

  // ======================
  // SEND MESSAGE
  // ======================

  const handleSend = () => {

    if (!input.trim()) {

      return;
    }

    // USER MESSAGE

    const userMessage = {

      sender: "user",

      text: input,
    };

    // AI MESSAGE

    const aiMessage = {

      sender: "ai",

      text:
        getAIResponse(input),
    };

    setMessages((prev) => [

      ...prev,

      userMessage,

      aiMessage,
    ]);

    setInput("");
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
            SecureX AI • Cyber Assistant
          </div>

          <h1 style={styles.title}>
            AI Cyber Assistant
          </h1>

          <p style={styles.desc}>
            Ask cybersecurity questions,
            get security guidance,
            phishing awareness,
            password recommendations,
            scam prevention tips,
            and cyber safety education.
          </p>

        </div>

        {/* CHAT CONTAINER */}

        <div style={styles.chatContainer}>

          {/* MESSAGES */}

          <div style={styles.messages}>

            {messages.map(
              (
                msg,
                index
              ) => (

                <div
                  key={index}

                  style={{

                    ...styles.message,

                    alignSelf:

                      msg.sender ===
                      "user"

                        ? "flex-end"

                        : "flex-start",

                    background:

                      msg.sender ===
                      "user"

                        ? "#22c55e"

                        : "rgba(255,255,255,0.08)",
                  }}
                >

                  {msg.text}

                </div>
              )
            )}

          </div>

          {/* INPUT */}

          <div style={styles.inputRow}>

            <input
              type="text"

              placeholder="Ask cybersecurity question..."

              value={input}

              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }

              style={styles.input}
            />

            <button
              style={styles.button}

              onClick={
                handleSend
              }
            >
              Send
            </button>

          </div>

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
    marginBottom: "40px",
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
    fontSize: "58px",
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

  chatContainer: {
    maxWidth: "1200px",
    margin: "auto",
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "28px",
    padding: "30px",
    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  messages: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    minHeight: "500px",
    maxHeight: "500px",
    overflowY: "auto",
    marginBottom: "30px",
  },

  message: {
    maxWidth: "75%",
    padding: "18px 22px",
    borderRadius: "18px",
    color: "white",
    fontSize: "17px",
    lineHeight: "1.7",
  },

  inputRow: {
    display: "flex",
    gap: "15px",
  },

  input: {
    flex: 1,
    padding: "18px",
    borderRadius: "14px",
    border: "none",
    background:
      "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: "17px",
    outline: "none",
  },

  button: {
    padding: "18px 30px",
    borderRadius: "14px",
    border: "none",
    background: "#22c55e",
    color: "white",
    fontWeight: "700",
    fontSize: "17px",
    cursor: "pointer",
  },
};

export default CyberAssistant;