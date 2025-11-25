import { useState, useEffect } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already logged in, skip login page
  useEffect(() => {
    const session = sessionStorage.getItem("loggedIn");
    if (session === "true") {
      onLogin();
    }
  }, [onLogin]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter both email and password.");
      return;
    }

    // Store login in session
    sessionStorage.setItem("loggedIn", "true");

    onLogin();
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={{ marginBottom: "15px" }}>Login</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  box: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
