import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/admin/dashboard")
      .then(res => setData(res.data))
      .catch(() => alert("Failed to load dashboard"));
  }, []);

  if (!data) {
    return <div style={{ padding: 30 }}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: "30px 20px", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ marginBottom: 20 }}>Admin Dashboard</h2>

        {/* ===== STATS ===== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 20,
            marginBottom: 40
          }}
        >
          <Stat title="Movies" value={data.totalMovies} />
          <Stat title="Shows" value={data.totalShows} />
          <Stat title="Bookings" value={data.totalBookings} />
          <Stat title="Revenue" value={`₹${data.totalRevenue}`} />
        </div>

        {/* ===== RECENT BOOKINGS ===== */}
        <h3 style={{ marginBottom: 16 }}>Recent Bookings</h3>

        {data.recentBookings.length === 0 && (
          <p style={{ color: "#666" }}>No bookings yet.</p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.recentBookings.map(b => (
            <div
              key={b._id}
              style={{
                background: "#fff",
                padding: 16,
                borderRadius: 10,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12
              }}
            >
              {/* LEFT */}
              <div>
                <strong>{b.show?.movie?.title}</strong>

                <div style={{ fontSize: 14, color: "#555", marginTop: 4 }}>
                  Seats: {b.seats.join(", ")}
                </div>

                <div style={{ fontSize: 13, color: "#777" }}>
                  {new Date(b.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </div>
              </div>

              {/* RIGHT */}
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "bold" }}>
                  ₹{b.totalAmount}
                </div>

                <span
                  style={{
                    display: "inline-block",
                    marginTop: 6,
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    color: "#fff",
                    background:
                      b.status === "cancelled" ? "#b71c1c" : "#2e7d32"
                  }}
                >
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 24,
        borderRadius: 12,
        textAlign: "center",
        boxShadow: "0 6px 16px rgba(0,0,0,0.12)"
      }}
    >
      <h3 style={{ margin: 0, fontSize: 28 }}>{value}</h3>
      <p style={{ margin: "6px 0 0", color: "#666" }}>{title}</p>
    </div>
  );
}
