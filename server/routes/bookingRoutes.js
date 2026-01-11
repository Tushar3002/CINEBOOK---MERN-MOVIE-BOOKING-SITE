const express = require("express");
const Booking = require("../models/Booking");
const Show = require("../models/Show");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { showId, seats } = req.body;

    if (!Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "No seats selected" });
    }

    const show = await Show.findOneAndUpdate(
      {
        _id: showId,
        bookedSeats: { $not: { $elemMatch: { $in: seats } } }
      },
      {
        $addToSet: { bookedSeats: { $each: seats } }
      },
      { new: true }
    );

    if (!show) {
      return res.status(400).json({ message: "Some seats already booked" });
    }

    const totalAmount = seats.length * show.pricePerSeat;

    const booking = await Booking.create({
      user: req.user.id,
      show: showId,
      seats,
      totalAmount
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ message: "Booking failed" });
  }
});

// Get bookings of logged-in user
router.get("/my", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({
        path: "show",
        populate: { path: "movie" }
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("FETCH MY BOOKINGS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// Cancel booking
router.put("/cancel/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
      status: "confirmed"
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found or already cancelled" });
    }

    // Remove booked seats from show
    await Show.findByIdAndUpdate(booking.show, {
      $pull: { bookedSeats: { $in: booking.seats } }
    });

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    console.error("CANCEL BOOKING ERROR:", err);
    res.status(500).json({ message: "Cancel failed" });
  }
});


module.exports = router;
