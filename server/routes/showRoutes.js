const express = require("express");
const Show = require("../models/Show");
const Movie = require("../models/Movie");
const { auth, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all shows (optionally filter by movie)
router.get("/", async (req, res) => {
  const { movieId } = req.query;
  const filter = movieId ? { movie: movieId } : {};
  const shows = await Show.find(filter).populate("movie").sort({ showTime: 1 });
  res.json(shows);
});

// Get single show
router.get("/:id", async (req, res) => {
  const show = await Show.findById(req.params.id).populate("movie");
  if (!show) return res.status(404).json({ message: "Show not found" });
  res.json(show);
});

// Admin: create show
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    // Validate movie exists
    const movie = await Movie.findById(req.body.movie);
    if (!movie) return res.status(400).json({ message: "Invalid movie id" });

    const show = await Show.create(req.body);
    res.status(201).json(show);
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid data" });
  }
});

// Admin: update show
router.put("/:id", auth, isAdmin, async (req, res) => {
  const show = await Show.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!show) return res.status(404).json({ message: "Show not found" });
  res.json(show);
});

// Admin: delete show
router.delete("/:id", auth, isAdmin, async (req, res) => {
  const show = await Show.findByIdAndDelete(req.params.id);
  if (!show) return res.status(404).json({ message: "Show not found" });
  res.json({ message: "Deleted" });
});

module.exports = router;
