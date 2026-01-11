
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

  return (

    <div
      style={{
        background: "#f5f5f5",
        minHeight: "100vh",
        padding: "30px 20px"
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto"
        }}
      >
     
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: 30,
            alignItems: "flex-start"
          }}
        >
          {/* LEFT SIDE */}
          <div>
            <h2 style={{ marginBottom: 6 }}>
              {show.movie?.title}
            </h2>

            <p style={{ color: "#666", marginTop: 0 }}>
              {new Date(show.showTime).toLocaleString()} • {show.theatreName}
            </p>

            <p style={{ fontWeight: "bold", marginTop: 6 }}>
              ₹{show.pricePerSeat} per seat
            </p>

            <div style={{ marginTop: 20 }}>
              <SeatLegend />
              <Screen />
            </div>

            {/* SEAT GRID */}
            <div
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                gap: 8
              }}
            >
              {rows.map(row => (
                <div
                  key={row}
                  style={{
                    display: "grid",
                    gridTemplateColumns: `30px repeat(${seatsPerRow}, 40px)`,
                    gap: 8,
                    alignItems: "center"
                  }}
                >

                  <div style={{ fontWeight: "bold", textAlign: "center" }}>
                    {row}
                  </div>

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
                          cursor: booked ? "not-allowed" : "pointer",
                          background: booked
                            ? "#d32f2f"
                            : sel
                            ? "#2e7d32"
                            : "#fafafa",
                          border: "1px solid #bbb",
                          fontSize: 12
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

          {/*  RIGHT SIDE */}
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 12,
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              position: "sticky",
              top: 20
            }}
          >
            {/* MOVIE POSTER */}
            {show.movie?.posterUrl && (
              <img
                src={show.movie.posterUrl}
                alt={show.movie.title}
                style={{
                  width: "100%",
                  height: 450,         
                  objectFit: "cover",
                  borderRadius: 10,
                  marginBottom: 12
                }}
              />
            )}


            <h3 style={{ marginTop: 0 }}>Booking Summary</h3>


            <p>
              <strong>Seats:</strong>{" "}
              {selected.join(", ") || "None"}
            </p>

            <p>
              <strong>Total:</strong>{" "}
              ₹{selected.length * show.pricePerSeat}
            </p>

            <button
              disabled={selected.length === 0}
              onClick={() =>
                navigate("/fake-payment", {
                  state: {
                    showId,
                    seats: selected,
                    amount: selected.length * show.pricePerSeat
                  }
                })
              }
              style={{
                marginTop: 12,
                width: "100%",
                padding: "12px 0",
                background: "#e50914",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                cursor:
                  selected.length === 0 ? "not-allowed" : "pointer"
              }}
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
