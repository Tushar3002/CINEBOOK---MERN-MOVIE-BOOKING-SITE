import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    language: "",
    duration: "",
    posterUrl: ""
  });
  const [editingId, setEditingId] = useState(null);


  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchMovies = async () => {
    const res = await api.get("/movies/admin/all");
    setMovies(res.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...form,
    duration: Number(form.duration)
  };

  try {
    if (editingId) {
      // UPDATE
      await api.put(`/movies/${editingId}`, payload);
    } else {
      // CREATE
      await api.post("/movies", payload);
    }

    setForm({
      title: "",
      description: "",
      language: "",
      duration: "",
      posterUrl: ""
    });
    setEditingId(null);
    fetchMovies();
  } catch (err) {
    alert("Failed to save movie");
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;
    await api.delete(`/movies/${id}`);
    fetchMovies();
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
          <h2>Add Movies</h2>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => navigate("/admin/shows")}>
              Manage Shows
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

        {/* ADD MOVIE */}
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
            marginBottom: 30
          }}
        >
          <h3>{editingId ? "Edit Movie" : "Add Movie"}</h3>


          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12
              }}
            >
              <input
                name="title"
                placeholder="Movie title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <input
                name="language"
                placeholder="Language"
                value={form.language}
                onChange={handleChange}
              />

              <input
                name="duration"
                placeholder="Duration (minutes)"
                value={form.duration}
                onChange={handleChange}
              />

              <input
                name="posterUrl"
                placeholder="Poster URL"
                value={form.posterUrl}
                onChange={handleChange}
              />
            </div>

            <textarea
              name="description"
              placeholder="Movie description"
              value={form.description}
              onChange={handleChange}
              style={{
                marginTop: 12,
                width: "100%",
                height: 80
              }}
            />

            <button
  type="submit"
  style={{
    marginTop: 12,
    padding: "10px 18px",
    background: editingId ? "#1976d2" : "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }}
>
  {editingId ? "Update Movie" : "Add Movie"}
</button>

          </form>
        </div>

        {/* MOVIE LIST */}
        <div
          style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 6px 16px rgba(0,0,0,0.1)"
          }}
        >
          <h3>Movies List</h3>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 12
            }}
          >
            <thead>
              <tr style={{ background: "#fafafa" }}>
                <th style={th}>Poster</th>
                <th style={th}>Title</th>
                <th style={th}>Language</th>
                <th style={th}>Duration</th>
                <th style={th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {movies.map((m) => (
                <tr key={m._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={td}>
                    {m.posterUrl ? (
                      <img
                        src={m.posterUrl}
                        alt={m.title}
                        style={{
                          width: 50,
                          height: 70,
                          objectFit: "cover",
                          borderRadius: 4
                        }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>

                  <td style={td}>{m.title}</td>
                  <td style={td}>{m.language || "—"}</td>
                  <td style={td}>{m.duration ? `${m.duration} min` : "—"}</td>

                  <td style={td}>
                    <button
                      onClick={() => handleDelete(m._id)}
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
                    <button
  onClick={() => {
    setForm({
      title: m.title || "",
      description: m.description || "",
      language: m.language || "",
      duration: m.duration || "",
      posterUrl: m.posterUrl || ""
    });
    setEditingId(m._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  style={{
    background: "#1976d2",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: 4,
    cursor: "pointer",
    marginRight: 6
  }}
>
  Edit
</button>

                  </td>
                </tr>
              ))}

              {movies.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: 20 }}>
                    No movies added yet
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
