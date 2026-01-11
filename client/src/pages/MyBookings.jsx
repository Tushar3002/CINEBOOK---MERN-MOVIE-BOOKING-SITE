import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/bookings/my")
      .then(res => setBookings(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load bookings");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ padding: 30 }}>Loading bookings...</div>;
  }

  if (bookings.length === 0) {
    return <div style={{ padding: 30 }}>No bookings yet.</div>;
  }

  return (
    <div style={{ padding: "30px 20px", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ marginBottom: 20 }}>My Bookings</h2>

        {bookings.map(b => (
          <div
            key={b._id}
            style={{
              display: "flex",
              gap: 20,
              background: "#fff",
              padding: 16,
              borderRadius: 12,
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              marginBottom: 20
            }}
          >
            {/* 🎬 POSTER */}
            {b.show?.movie?.posterUrl && (
              <img
                src={b.show.movie.posterUrl}
                alt={b.show.movie.title}
                style={{
                  width: 120,
                  height: 180,
                  objectFit: "cover",
                  borderRadius: 8
                }}
              />
            )}

            {/* 📄 DETAILS */}
            <div style={{ flex: 1 }}>
              <h4 style={{ marginTop: 0, marginBottom: 6 }}>
                {b.show?.movie?.title}
              </h4>

              <p style={{ margin: "4px 0", color: "#777" }}>
                <strong>Booked on:</strong>{" "}
                {new Date(b.createdAt).toLocaleString()}
              </p>

              <p style={{ margin: "4px 0", color: "#555" }}>
                <strong>Show:</strong>{" "}
                {new Date(b.show.showTime).toLocaleString()}
              </p>

              <p style={{ margin: "4px 0", color: "#555" }}>
                <strong>Theatre:</strong> {b.show.theatreName}
              </p>

              <p style={{ margin: "4px 0" }}>
                <strong>Seats:</strong> {b.seats.join(", ")}
              </p>

              <p style={{ margin: "4px 0" }}>
                <strong>Total:</strong> ₹{b.totalAmount}
              </p>

              <div style={{ marginTop: 10, display: "flex", gap: 12, alignItems: "center" }}>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 13,
                    color: "#fff",
                    background:
                      b.status === "cancelled" ? "#b71c1c" : "#2e7d32"
                  }}
                >
                  {b.status}
                </span>

                {b.status === "confirmed" && (
                  <button
                    onClick={async () => {
                      if (!window.confirm("Cancel this booking?")) return;

                      await api.put(`/bookings/cancel/${b._id}`);
                      alert("Booking cancelled");

                      const res = await api.get("/bookings/my");
                      setBookings(res.data);
                    }}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 6,
                      border: "none",
                      background: "#e50914",
                      color: "#fff",
                      cursor: "pointer"
                    }}
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
