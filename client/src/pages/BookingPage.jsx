import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import SeatLegend from "../components/SeatLegend";
import Screen from "../components/Screen";

export default function BookingPage() {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    api.get(`/shows/${showId}`).then(res => setShow(res.data));
  }, [showId]);

  if (!show) {
    return <div style={{ padding: 20 }}>Loading show...</div>;
  }

  const seatsPerRow = 10;
  const totalSeats = show.totalSeats;
  const rowCount = Math.ceil(totalSeats / seatsPerRow);

  const rows = Array.from({ length: rowCount }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  const allSeats = [];
  let seatCounter = 0;

  for (let r = 0; r < rows.length; r++) {
    for (let s = 1; s <= seatsPerRow; s++) {
      if (seatCounter >= totalSeats) break;
      allSeats.push(`${rows[r]}${s}`);
      seatCounter++;
    }
  }

  const isBooked = (seat) => show.bookedSeats?.includes(seat);

  const toggle = (seat) => {
    if (isBooked(seat)) return;
    setSelected(prev =>
      prev.includes(seat)
        ? prev.filter(s => s !== seat)
        : [...prev, seat]
    );
  };
  const handleCheckout = async () => {
  const res = await fetch("/api/stripe/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      showId,
      seats: selected,
      amount: totalAmount,
    }),
  });

  const data = await res.json();
  window.location.href = data.url; // 🔥 redirect to Stripe
};


  const totalAmount = selected.length * show.pricePerSeat;

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "30px 20px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 30 }}>
          
          {/* LEFT SIDE */}
          <div>
            <h2>{show.movie?.title}</h2>
            <p style={{ color: "#666" }}>
              {new Date(show.showTime).toLocaleString()} • {show.theatreName}
            </p>

            <p style={{ fontWeight: "bold" }}>
              ₹{show.pricePerSeat} per seat
            </p>

            <SeatLegend />
            <Screen />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // 🔥 centers horizontally
                marginTop: 20
              }}
            >
            {rows.map(row => (
              <div
                key={row}
                style={{
                  display: "grid",
                  gridTemplateColumns: `30px repeat(${seatsPerRow}, 40px)`,
                  gap: 8,
                  marginBottom: 8
                }}
              >
                <strong>{row}</strong>

                {Array.from({ length: seatsPerRow }, (_, i) => {
                  const seat = `${row}${i + 1}`;
                  if (!allSeats.includes(seat)) return null;

                  const booked = isBooked(seat);
                  const sel = selected.includes(seat);

                  return (
                    <button
                      key={seat}
                      disabled={booked}
                      onClick={() => toggle(seat)}
                      style={{
                        height: 36,
                        width: 36,
                        borderRadius: 6,
                        background: booked
                          ? "#d32f2f"
                          : sel
                          ? "#2e7d32"
                          : "#000000",
                        cursor: booked ? "not-allowed" : "pointer"
                      }}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
            ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div style={{ background: "#fff", padding: 20, borderRadius: 12 }}>
            {show.movie?.posterUrl && (
              <img
                src={show.movie.posterUrl}
                alt={show.movie.title}
                style={{ width: "100%", height: 450, objectFit: "cover" }}
              />
            )}

            <h3>Booking Summary</h3>

            <p><strong>Seats:</strong> {selected.join(", ") || "None"}</p>
            <p><strong>Total:</strong> ₹{totalAmount}</p>

            <button
              disabled={selected.length === 0}
              onClick={handleCheckout}
              style={{
                width: "100%",
                padding: "12px 0",
                background: "#e50914",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: selected.length === 0 ? "not-allowed" : "pointer"
              }}
            >
               Proceed to Pay ₹{totalAmount}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
