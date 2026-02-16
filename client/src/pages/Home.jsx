
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    api.get("/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.error("Failed to fetch movies:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "30px 40px" }}>
      <h2 style={{ marginBottom: 20 }}>🎬 Now Showing</h2>

      {loading && <p>Loading movies...</p>}
      {!loading && movies.length === 0 && <p>No movies found</p>}

      {/* GRID  */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 24
        }}
      >
        {movies.map((m) => (
          <Link
            key={m._id}
            to={`/movie/${m._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {/* MOVIE CARD */}
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                overflow: "hidden",
                height: 420,                       
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.18)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
              }}
            >
              {/* POSTER */}
              {m.posterUrl ? (
                <img
                  src={m.posterUrl}
                  alt={m.title}
                  style={{
                    width: "100%",
                    height: 280,
                    objectFit: "cover"
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 280,
                    background: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#777"
                  }}
                >
                  No Poster
                </div>
              )}

              {/* DETAILS */}
              <div
                style={{
                  padding: 12,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <h4
                  style={{
                    margin: "6px 0",
                    fontSize: 15,
                    lineHeight: "1.2em",
                    height: "2.4em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  {m.title}
                </h4>

                <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
                  {m.language || "Language N/A"}
                </p>

                {m.duration && (
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#888" }}>
                    ⏱ {m.duration} min
                  </p>
                )}

                {user?.role !== "admin" && (
  <button
    style={{
      marginTop: "auto",
      width: "100%",
      padding: "8px 0",
      background: "#e50914",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      fontSize: 14
    }}
  >
    Book Now
  </button>
)}

              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
