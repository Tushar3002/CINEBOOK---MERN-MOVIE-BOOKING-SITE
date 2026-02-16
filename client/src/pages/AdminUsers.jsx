import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;

    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <div style={{ padding: 30 }}>Loading users...</div>;
  }

  return (
    <div style={{ padding: 30, background: "#f4f6f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <h2>Admin – Users</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => navigate("/admin/movies")}>Movies</button>
            <button onClick={() => navigate("/admin/shows")}>Shows</button>
            <button onClick={() => {
              logout();
              navigate("/login");
            }}>
              Logout
            </button>
          </div>
        </div>

        {/* USERS TABLE */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            padding: 20
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th style={th}>Name</th>
                <th style={th}>Email</th>
                <th style={th}>Phone</th>
                <th style={th}>DOB</th>
                <th style={th}>Role</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={td}>{u.name}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>{u.phone || "—"}</td>
                  <td style={td}>
                    {u.dob ? new Date(u.dob).toLocaleDateString() : "—"}
                  </td>
                  <td style={td}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 20,
                        fontSize: 12,
                        background: u.role === "admin" ? "#333" : "#e50914",
                        color: "#fff"
                      }}
                    >
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={td}>
                    {user.id !== u._id && (
                      <button
                        onClick={() => deleteUser(u._id)}
                        style={{
                          background: "#b71c1c",
                          color: "#fff",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: 6,
                          cursor: "pointer"
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

/* STYLES */
const th = {
  textAlign: "left",
  padding: 12,
  fontSize: 14
};

const td = {
  padding: 12,
  fontSize: 14
};
