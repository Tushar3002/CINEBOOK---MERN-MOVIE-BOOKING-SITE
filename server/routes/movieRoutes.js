const express = require("express");
const Movie = require("../models/Movie");
const { auth, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Public: get all active movies
router.get("/", async (req, res) => {
  const movies = await Movie.find({ isActive: true }).sort({ createdAt: -1 });
  res.json(movies);
});

// Public: get one movie
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json(movie);
});

// Admin: get all movies (including inactive)
router.get("/admin/all", auth, isAdmin, async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.json(movies);
});

// Admin: create movie
router.post("/", auth, isAdmin, async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
});

// Admin: update movie
router.put("/:id", auth, isAdmin, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
});

// Admin: delete movie
router.delete("/:id", auth, isAdmin, async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json({ message: "Deleted" });
});

module.exports = router;
