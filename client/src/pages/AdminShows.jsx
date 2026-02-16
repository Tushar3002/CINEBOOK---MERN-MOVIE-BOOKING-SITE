import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminShows() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [form, setForm] = useState({
    movie: "",
    theatreName: "",
    location: "",
    showTime: "",
    pricePerSeat: "",
    totalSeats: "60"
  });

  useEffect(() => {
    api.get("/movies/admin/all").then(res => setMovies(res.data));
    api.get("/shows").then(res => setShows(res.data));
  }, []);

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/shows", {
        ...form,
        pricePerSeat: Number(form.pricePerSeat),
        totalSeats: Number(form.totalSeats)
      });

      alert("Show created!");
      api.get("/shows").then(res => setShows(res.data));

      setForm({
        movie: form.movie,
        theatreName: "",
        location: "",
        showTime: "",
        pricePerSeat: "",
        totalSeats: "60"
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create show");
    }
  };

  const deleteShow = async (id) => {
    if (!window.confirm("Delete this show?")) return;
    await api.delete(`/shows/${id}`);
    api.get("/shows").then(res => setShows(res.data));
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: 30 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30
          }}
        >
          <h2>Add Shows</h2>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => navigate("/admin/movies")}>
              Manage Movies
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* CREATE SHOW */}
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
            marginBottom: 30
          }}
        >
          <h3>Create New Show</h3>

          <form onSubmit={handleCreate}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12
              }}
            >
              <select
                name="movie"
                value={form.movie}
                onChange={handleChange}
                required
              >
                <option value="">Select Movie</option>
                {movies.map(m => (
                  <option key={m._id} value={m._id}>
                    {m.title}
                  </option>
                ))}
              </select>

              <input
                name="theatreName"
                placeholder="Theatre Name"
                value={form.theatreName}
                onChange={handleChange}
                required
              />

              <input
                name="location"
                placeholder="SCREENING LOCATION"
                value={form.location}
                onChange={handleChange}
              />

              <input
                type="datetime-local"
                name="showTime"
                value={form.showTime}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="pricePerSeat"
                placeholder="Price per seat"
                value={form.pricePerSeat}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="totalSeats"
                placeholder="Total seats"
                value={form.totalSeats}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                marginTop: 14,
                padding: "10px 18px",
                background: "#e50914",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              Create Show
            </button>
          </form>
        </div>

        {/* SHOWS LIST */}
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)"
          }}
        >
          <h3>All Shows</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 12
            }}
          >
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th style={th}>Movie</th>
                <th style={th}>Theatre</th>
                <th style={th}>Location</th>
                <th style={th}>Show Time</th>
                <th style={th}>Price</th>
                <th style={th}>Seats</th>
                <th style={th}></th>
              </tr>
            </thead>

            <tbody>
              {shows.map(s => (
                <tr key={s._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={td}>{s.movie?.title}</td>
                  <td style={td}>{s.theatreName}</td>
                  <td style={td}>{s.location || "—"}</td>
                  <td style={td}>
                    {new Date(s.showTime).toLocaleString()}
                  </td>
                  <td style={td}>₹{s.pricePerSeat}</td>
                  <td style={td}>
                    {s.bookedSeats.length}/{s.totalSeats}
                  </td>
                  <td style={td}>
                    <button
                      onClick={() => deleteShow(s._id)}
                      style={{
                        background: "#b71c1c",
                        color: "#fff",
                        border: "none",
                        padding: "6px 10px",
                        borderRadius: 4,
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {shows.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: 20 }}>
                    No shows added yet
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

/* TABLE STYLES */
const th = {
  textAlign: "left",
  padding: 10,
  fontWeight: 600,
  fontSize: 14
};

const td = {
  padding: 10,
  fontSize: 14
};
