import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import BookingQR from "../components/BookingQR";
import { downloadTicketPDF } from "../utils/downloadTicket";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/bookings/my")
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
    <div
      style={{
        padding: "40px 20px",
        background: "#f4f6f8",
        minHeight: "100vh"
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ marginBottom: 25 }}>🎟 My Bookings</h2>

        {bookings.map(b => {
          const show = b.show; // may be null
          const movie = show?.movie;

          const showTime = show ? new Date(show.showTime) : null;
          const now = new Date();
          const hasStarted = showTime ? now >= showTime : false;
          return (
            <div
              key={b._id}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr 200px",
                gap: 20,
                background: "#fff",
                padding: 18,
                borderRadius: 14,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                marginBottom: 22,
                alignItems: "center"
              }}
            >
              {/* 🎬 POSTER */}
              {movie?.posterUrl ? (
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  style={{
                    width: 120,
                    height: 180,
                    objectFit: "cover",
                    borderRadius: 10
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 120,
                    height: 180,
                    borderRadius: 10,
                    background: "#ddd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    color: "#666"
                  }}
                >
                  No Poster
                </div>
              )}

              {/* 📄 DETAILS */}
              <div>
                <h3 style={{ margin: "0 0 6px" }}>
                  {movie?.title || "Movie unavailable"}
                </h3>

                <p style={{ margin: "4px 0", fontSize: 13, color: "#777" }}>
                  <strong>Booked on:</strong>{" "}
                  {new Date(b.createdAt).toLocaleString()}
                </p>

                <p style={{ margin: "4px 0", color: "#000000" }}>
                  <strong>Show:</strong>{" "}
                  {show
                    ? new Date(show.showTime).toLocaleString()
                    : "Show deleted"}
                </p>

                <p style={{ margin: "4px 0", color: "#000000" }}>
                  <strong>Theatre:</strong>{" "}
                  {show?.theatreName || "N/A"}
                </p>

                <p style={{ margin: "5px 0", color: "#000000" }}>
                  <strong>Location:</strong>{" "}
                  {show?.location || "N/A"}
                </p>

                <p style={{ margin: "4px 0" }}>
                  <strong>Seats:</strong> {b.seats.join(", ")}
                </p>

                <p style={{ margin: "4px 0", fontWeight: 600 }}>
                  Total: ₹{b.totalAmount}
                </p>

                {/* STATUS + ACTIONS */}
                <div style={{ marginTop: 10, display: "flex", gap: 12 }}>
                  <span
                    style={{
                      padding: "5px 14px",
                      borderRadius: 20,
                      fontSize: 13,
                      color: "#fff",
                      background:
                        b.status === "cancelled" ? "#b71c1c" : "#2e7d32"
                    }}
                  >
                    {b.status.toUpperCase()}
                  </span>

                  {b.status === "confirmed" && show && !hasStarted && (
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
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* 📱 QR + PDF */}
              <div
                style={{
                  textAlign: "center",
                  borderLeft: "1px dashed #ddd",
                  paddingLeft: 16
                }}
              >
                {b.status === "confirmed" && show ? (
                  <>
                    <BookingQR bookingId={b._id} />
                    <p style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
                      Scan at entry
                    </p>

                    <button
                      onClick={() => downloadTicketPDF(b)}
                      style={{
                        marginTop: 10,
                        padding: "6px 14px",
                        borderRadius: 6,
                        border: "1px solid #333",
                        background: "#eb1717",
                        cursor: "pointer"
                      }}
                    >
                      Download Ticket
                    </button>
                  </>
                ) : (
                  <p style={{ fontSize: 12, color: "#999" }}>
                    Ticket unavailable
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
