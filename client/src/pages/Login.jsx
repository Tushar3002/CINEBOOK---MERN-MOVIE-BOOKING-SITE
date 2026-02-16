
import { useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      if (res.data.user.role === "admin") navigate("/admin/movies");
      else navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          width: 420,
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)"
        }}
      >
        <h2 style={{ marginTop: 0 }}>Login</h2>

        {error && (
          <div style={{ color: "crimson", marginBottom: 10 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              style={{
                width: "100%",
                padding: 8,
                marginTop: 4,
                borderRadius: 6,
                border: "1px solid #ccc"
              }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 8,
                marginTop: 4,
                borderRadius: 6,
                border: "1px solid #ccc"
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px 0",
              background: "#e50914",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 15
            }}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: 14, fontSize: 14 }}>
          Don’t have an account?{" "}
          <Link to="/register">Register here</Link>
        </div>
      </div>
    </div>
  );
}
