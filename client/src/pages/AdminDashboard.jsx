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
    return <div style={{ padding: 40 }}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: "40px 20px", background: "#f4f6f8", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ marginBottom: 30 }}>
          <h2 style={{ margin: 0 }}>📊 Admin Dashboard</h2>
          <p style={{ color: "#666", marginTop: 6 }}>
            Overview of CineBook activity
          </p>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginBottom: 40
          }}
        >
          <StatCard title="Movies" value={data.totalMovies} color="#6a11cb" />
          <StatCard title="Shows" value={data.totalShows} color="#2575fc" />
          <StatCard title="Bookings" value={data.totalBookings} color="#11998e" />
          <StatCard
            title="Revenue"
            value={`₹${data.totalRevenue}`}
            color="#e50914"
            big
          />
        </div>

        {/* RECENT BOOKINGS */}
        <div>
          <h3 style={{ marginBottom: 14 }}>🧾 Recent Bookings</h3>

          {data.recentBookings.length === 0 && (
            <p style={{ color: "#666" }}>No bookings yet.</p>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {data.recentBookings.map(b => (
              <div
                key={b._id}
                style={{
                  background: "#fff",
                  padding: 18,
                  borderRadius: 12,
                  boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16
                }}
              >
                {/* LEFT */}
                <div>
                  <div style={{ fontWeight: 600 }}>
                    {b.show?.movie?.title || "Movie unavailable"}
                  </div>

                  <div style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                    🎟 Seats: {b.seats.join(", ")}
                  </div>

                  <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
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
                  <div style={{ fontWeight: 700 }}>
                    ₹{b.totalAmount}
                  </div>

                  <StatusChip status={b.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ===== COMPONENTS ===== */

function StatCard({ title, value, color, big }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${color}, #000)`,
        color: "#fff",
        padding: big ? 30 : 24,
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)"
      }}
    >
      <div style={{ fontSize: big ? 36 : 28, fontWeight: 700 }}>
        {value}
      </div>
      <div style={{ opacity: 0.9, marginTop: 6 }}>
        {title}
      </div>
    </div>
  );
}

function StatusChip({ status }) {
  const isCancelled = status === "cancelled";

  return (
    <span
      style={{
        display: "inline-block",
        marginTop: 8,
        padding: "5px 14px",
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        color: "#fff",
        background: isCancelled ? "#b71c1c" : "#2e7d32"
      }}
    >
      {status.toUpperCase()}
    </span>
  );
}
