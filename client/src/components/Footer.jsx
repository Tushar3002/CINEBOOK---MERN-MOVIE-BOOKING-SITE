// client/src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <div>
        <strong>CineBook © {new Date().getFullYear()}</strong>
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/terms">Terms</Link>
      </div>
    </footer>
  );
}

const footerStyle = {
  marginTop: 40,
  padding: "20px 40px",
  borderTop: "1px solid #ddd",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#000000",
  color: "#fff"
};
