// client/src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      borderBottom: "1px solid #ddd",
      marginBottom: 20
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: "none" }}>MovieBook</Link>
        <Link to="/" style={{ textDecoration: "none" }}>Home</Link>
        {user?.role === "admin" && (<Link to="/admin/dashboard">Dashboard</Link>)}
        {user?.role === "admin" && <Link to="/admin/movies" style={{ textDecoration: "none" }}>Admin Movies</Link>}
        {user?.role === "admin" && <Link to="/admin/shows" style={{ textDecoration: "none" }}>Admin Shows</Link>}
      </div>

      <div>
        {!user ? (
          <>
            <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span style={{ marginRight: 12 }}>Hi, {user.name}</span>
            <Link to="/my-bookings" style={{ marginRight: 12 }}>My Bookings</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
