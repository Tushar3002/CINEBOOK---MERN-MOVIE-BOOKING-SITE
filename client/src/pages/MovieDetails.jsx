
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";


const isObjectId = (s) => /^[0-9a-fA-F]{24}$/.test(s);

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useAuth();

  useEffect(() => {
    if (!id || !isObjectId(id)) {
      setError("Invalid movie id.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    Promise.all([
      api.get(`/movies/${id}`),
      api.get(`/shows?movieId=${id}`)
    ])
      .then(([movieRes, showsRes]) => {
        setMovie(movieRes.data);
        setShows(showsRes.data);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load movie details.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ padding: 20, color: "crimson" }}>{error}</div>;
  if (!movie) return <div style={{ padding: 20 }}>Movie not found</div>;
  const getNextDays = (days = 5) => {
    const result = [];
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      result.push(d);
    }
    return result;
  };

  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const filteredShows = shows.filter(s =>
  isSameDay(new Date(s.showTime), selectedDate)
);


  return (
    <div style={{ padding: "30px 40px", maxWidth: 1200, margin: "0 auto" }}>
      
      {/* 🎬 MOVIE HERO */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginBottom: 30
        }}
      >
        {/* POSTER */}
        {movie.posterUrl && (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            style={{
              width: 260,
              height: 380,
              objectFit: "cover",
              borderRadius: 12,
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
            }}
          />
        )}

        {/* DETAILS */}
        <div style={{ flex: 1 }}>
          <h2 style={{ marginTop: 0 }}>{movie.title}</h2>

          <p style={{ color: "#666", lineHeight: 1.6 }}>
            {movie.description || "No description available."}
          </p>

          <p style={{ marginTop: 10, color: "#444" }}>
            <strong>Language:</strong> {movie.language || "N/A"}
          </p>

          {movie.duration && (
            <p style={{ color: "#444" }}>
              <strong>Duration:</strong> {movie.duration} min
            </p>
          )}
        </div>
      </div>

      {/* 📅 DATE SELECTOR */}
<div
  style={{
    display: "flex",
    gap: 12,
    marginBottom: 20,
    overflowX: "auto"
  }}
>
  {getNextDays(6).map((date, index) => {
    const active = isSameDay(date, selectedDate);

    return (
      <button
        key={index}
        onClick={() => setSelectedDate(date)}
        style={{
          minWidth: 90,
          padding: "10px 12px",
          borderRadius: 8,
          border: active ? "2px solid #e50914" : "1px solid #ccc",
          background: active ? "#e50914" : "#fff",
          color: active ? "#fff" : "#000",
          cursor: "pointer"
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600 }}>
          {date.toLocaleDateString("en-IN", { weekday: "short" })}
        </div>
        <div style={{ fontSize: 12 }}>
          {date.getDate()}/{date.getMonth() + 1}
        </div>
      </button>
    );
  })}
</div>


      {/* 🎟 SHOWS SECTION */}
      <h3 style={{ marginBottom: 16 }}>Available Shows</h3>

      {filteredShows.length === 0 && (
        <p style={{ color: "#666" }}>
          No shows available for selected date.
        </p>
      )}


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20
        }}
      >
        {filteredShows.map(s => (

          <div
            key={s._id}
            style={{
              background: "#fff",
              padding: 16,
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold" }}>
              {new Date(s.showTime).toLocaleString()}
            </p>

            <p style={{ margin: "6px 0", color: "#555" }}>
              {s.theatreName}
            </p>

            <p style={{ margin: "6px 0", color: "#333" }}>
              ₹{s.pricePerSeat} per seat
            </p>

            {/* {user?.role !== "admin" && (
            <Link to={`/book/${s._id}`}>
              <button
                style={{
                  marginTop: 10,
                  width: "100%",
                  padding: "8px 0",
                  background: "#e50914",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer"
                }}
              >
                Book Tickets
              </button>
            </Link>
            
)} */}
{user?.role === "admin" ? (
  <button disabled style={{ opacity: 0.5 }}>
    Admin cannot book tickets
  </button>
) : (
  <Link to={`/book/${s._id}`}>
    <button>Book Tickets</button>
  </Link>
)}


          </div>
        ))}
      </div>
    </div>
  );
}
