import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

import bg from "../assets/bg3.jpg";

function Profile() {

  const navigate =
    useNavigate();

  const [user,
    setUser] =
    useState(null);

  const [profileImage,
    setProfileImage] =
    useState("");

  // ======================
  // LOAD USER DATA
  // ======================

  useEffect(() => {

    const savedUser =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (savedUser) {

      setUser(savedUser);
    }

    // LOAD PROFILE IMAGE

    const savedImage =
      localStorage.getItem(
        "profileImage"
      );

    if (savedImage) {

      setProfileImage(
        savedImage
      );
    }

  }, []);

  // ======================
  // PROFILE IMAGE UPLOAD
  // ======================

  const handleImageUpload = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) {

      return;
    }

    const reader =
      new FileReader();

    reader.onloadend =
      () => {

        localStorage.setItem(

          "profileImage",

          reader.result
        );

        setProfileImage(
          reader.result
        );
      };

    reader.readAsDataURL(
      file
    );
  };

  // ======================
  // LOGOUT
  // ======================

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    localStorage.removeItem(
      "profileImage"
    );

    navigate("/login");
  };

  // ======================
  // DELETE ACCOUNT
  // ======================

  const handleDelete =
    async () => {

      const confirmDelete =
        window.confirm(

          "Are you sure you want to delete your account permanently?"
        );

      if (!confirmDelete) {

        return;
      }

      try {

        // GET USER

        const savedUser =
          JSON.parse(
            localStorage.getItem(
              "user"
            )
          );

        // CHECK EMAIL

        if (
          !savedUser?.email
        ) {

          alert(
            "User email not found ❌"
          );

          return;
        }

        // DELETE API CALL

        const response =
          await axios.post(

            "https://securex-backend-mlm3.onrender.com/api/auth/delete",

            {
              email:
                savedUser.email,
            }
          );

        // SUCCESS

        alert(
          response.data
            .message
        );

        // CLEAR STORAGE

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "profileImage"
        );

        localStorage.removeItem(
          "securex_scans"
        );

        // REDIRECT

        navigate(
          "/register"
        );

      } catch (error) {

        console.log(error);

        alert(

          error.response?.data
            ?.message ||

          "Delete Failed ❌"
        );
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

        <div style={styles.profileCard}>

          {/* PROFILE IMAGE */}

          <div style={styles.imageWrapper}>

            {profileImage ? (

              <img
                src={profileImage}
                alt="Profile"

                style={
                  styles.profileImage
                }
              />

            ) : (

              <div style={styles.avatar}>
                👤
              </div>

            )}

          </div>

          {/* IMAGE UPLOAD */}

          <label style={styles.uploadBtn}>

            Upload Profile Picture

            <input
              type="file"

              accept="image/*"

              style={{
                display: "none",
              }}

              onChange={
                handleImageUpload
              }
            />

          </label>

          {/* USER INFO */}

          <h1 style={styles.name}>

            {user?.name ||
              "SecureX User"}

          </h1>

          <p style={styles.email}>

            {user?.email ||
              "No Email Found"}

          </p>

          {/* BUTTONS */}

          <div style={styles.buttonRow}>

            <button
              style={styles.logoutBtn}

              onClick={
                handleLogout
              }
            >
              Logout
            </button>

            <button
              style={styles.deleteBtn}

              onClick={
                handleDelete
              }
            >
              Delete Account
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
    display: "flex",
    justifyContent:
      "center",
    alignItems: "center",
    padding: "20px",
  },

  profileCard: {
    width: "100%",
    maxWidth: "650px",
    background:
      "rgba(0,0,0,0.55)",
    borderRadius: "30px",
    padding: "45px",
    textAlign: "center",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(5px)",
  },

  imageWrapper: {
    marginBottom: "25px",
  },

  avatar: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    background:
      "rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "70px",
    margin: "auto",
  },

  profileImage: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    objectFit: "cover",
    border:
      "4px solid #22c55e",
  },

  uploadBtn: {
    display: "inline-block",
    padding: "14px 24px",
    borderRadius: "14px",
    background:
      "#22c55e",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "35px",
  },

  name: {
    fontSize: "42px",
    marginBottom: "18px",
  },

  email: {
    fontSize: "20px",
    color: "#d1d5db",
    marginBottom: "40px",
  },

  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  logoutBtn: {
    padding: "16px 30px",
    borderRadius: "14px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "700",
    fontSize: "17px",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "16px 30px",
    borderRadius: "14px",
    border: "none",
    background: "#ef4444",
    color: "white",
    fontWeight: "700",
    fontSize: "17px",
    cursor: "pointer",
  },
};

export default Profile;