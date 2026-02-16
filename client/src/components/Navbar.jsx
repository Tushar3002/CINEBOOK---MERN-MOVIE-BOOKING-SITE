// client/src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontWeight: 500
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 32px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #eee",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      {/* Left Section */}
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 800,
            fontSize: 20,
            textDecoration: "none",
            color: "#111"
          }}
        >
          <img src={logo} alt="CineBook Logo" style={{ height: 48 }} />
          CineBook
        </Link>

        <Link to="/" style={linkStyle}>Home</Link>
        {user?.role !== "admin" && (<>
          <Link to="/about" style={linkStyle}>About</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
        </>
        )}
        

        {user?.role === "admin" && (
          <>
            <Link to="/admin/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/admin/movies" style={linkStyle}>Movies</Link>
            <Link to="/admin/shows" style={linkStyle}>Shows</Link>
            <Link to="/admin/users" style={linkStyle}>Users</Link>
          </>
        )}
      </div>

      {/* Right Section */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {!user ? (
          <>
            <Link
              to="/login"
              style={{
                ...linkStyle,
                padding: "6px 14px",
                borderRadius: 6
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 6,
                backgroundColor: "#111",
                color: "#fff",
                fontWeight: 500
              }}
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span style={{ fontWeight: 500 }}>
              Hi, <strong>{user.name}</strong>
            </span>

            {user.role !== "admin" && (
              <Link to="/my-bookings" style={linkStyle}>
                My Bookings
              </Link>
            )}

            <button
              onClick={handleLogout}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "none",
                backgroundColor: "#e53935",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 500
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
