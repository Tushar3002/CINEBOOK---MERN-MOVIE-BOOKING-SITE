const express = require("express");
const Movie = require("../models/Movie");
const Show = require("../models/Show");
const Booking = require("../models/Booking");
const { auth, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin dashboard stats
router.get("/dashboard", auth, isAdmin, async (req, res) => {
  try {
    const totalMovies = await Movie.countDocuments();
    const totalShows = await Show.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const revenueAgg = await Booking.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = revenueAgg[0]?.total || 0;

    const recentBookings = await Booking.find()
      .populate({
        path: "show",
        populate: { path: "movie" }
      })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalMovies,
      totalShows,
      totalBookings,
      totalRevenue,
      recentBookings
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
});

module.exports = router;
