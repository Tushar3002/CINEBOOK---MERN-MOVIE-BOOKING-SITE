const express = require("express");
const Booking = require("../models/Booking");
const Show = require("../models/Show");
const { auth } = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");
const router = express.Router();
const User = require("../models/User");

const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role === "admin") {
      return res.status(403).json({
        message: "Admins are not allowed to book tickets"
      });
    }
    const { showId, seats } = req.body;

    if (!Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "No seats selected" });
    }
    const updatedShow = await Show.findOneAndUpdate(
      {
        _id: showId,
        bookedSeats: { $not: { $elemMatch: { $in: seats } } }
      },
      {
        $addToSet: { bookedSeats: { $each: seats } }
      },
      { new: true }
    );

    if (!updatedShow) {
      return res.status(400).json({ message: "Some seats already booked" });
    }

    const show = await Show.findById(updatedShow._id).populate("movie");

    if (!show.movie) {
      console.error("❌ Movie not populated for show:", show._id);
    }

    const totalAmount = seats.length * show.pricePerSeat;

   
const booking = await Booking.create({
  user: req.user.id,        
  show: show._id,
  seats,
  totalAmount,
  status: "confirmed"
});

await booking.populate({
  path: "show",
  populate: { path: "movie" }
});

const user = await User.findById(req.user.id);

const movieTitle =
  booking.show?.movie?.title || "Movie unavailable";
console.log("SHOW OBJECT 👉", booking.show);
console.log("LOCATION 👉", booking.show.location);
await sendEmail({
  to: user.email,          
  subject: "🎟 CineBook Ticket Confirmed",
  html: `
    <h2>Booking Confirmed 🎬</h2>

    <p><strong>Movie:</strong> ${movieTitle}</p>
    <p><strong>Theatre:</strong> ${booking.show.theatreName}</p>
    <p><strong>Screen:</strong> ${booking.show.location || "N/A"}</p>
    <p><strong>Show Time:</strong> ${new Date(
      booking.show.showTime
    ).toLocaleString()}</p>
    <p><strong>Seats:</strong> ${booking.seats.join(", ")}</p>
    <p><strong>Total:</strong> ₹${booking.totalAmount}</p>

    <br/>
    <p>Enjoy your movie! 🍿</p>
  `
});



console.log("EMAIL MOVIE:", booking.show.movie);
    res.status(201).json(booking);

  } catch (err) {
    console.error("BOOKING ERROR:", err);
    res.status(500).json({ message: "Booking failed" });
  }
});


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
// router.put("/cancel/:id", auth, async (req, res) => {
//   try {
//     const booking = await Booking.findOne({
//       _id: req.params.id,
//       user: req.user.id,
//       status: "confirmed"
//     });

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found or already cancelled" });
//     }

//     // Remove booked seats from show
//     await Show.findByIdAndUpdate(booking.show, {
//       $pull: { bookedSeats: { $in: booking.seats } }
//     });

//     booking.status = "cancelled";
//     await booking.save();

//     res.json({ message: "Booking cancelled successfully" });
//   } catch (err) {
//     console.error("CANCEL BOOKING ERROR:", err);
//     res.status(500).json({ message: "Cancel failed" });
//   }
// });

router.put("/cancel/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
      status: "confirmed"
    }).populate({
      path: "show",
      populate: { path: "movie" }
    });

    if (!booking) {
      return res
        .status(404)
        .json({ message: "Booking not found or already cancelled" });
    }

    await Show.findByIdAndUpdate(booking.show._id, {
      $pull: { bookedSeats: { $in: booking.seats } }
    });

    booking.status = "cancelled";
    await booking.save();


    const user = await User.findById(req.user.id);

    // safe fallbacks
    const movieTitle =
      booking.show?.movie?.title || "Movie unavailable";

    const showTime =
      booking.show?.showTime
        ? new Date(booking.show.showTime).toLocaleString()
        : "N/A";


    if (user?.email) {
      await sendEmail({
        to: user.email,
        subject: "❌ CineBook Ticket Cancelled",
        html: `
          <h2>Booking Cancelled ❌</h2>
          <p><strong>Movie:</strong> ${movieTitle}</p>
          <p><strong>Theatre:</strong> ${booking.show?.theatreName || "N/A"}</p>
          <p><strong>Screen:</strong> ${booking.show?.location || "N/A"}</p>
          <p><strong>Show Time:</strong> ${showTime}</p>
          <p><strong>Seats:</strong> ${booking.seats.join(", ")}</p>
          <p><strong>Amount:</strong> ₹${booking.totalAmount}</p>
          <br/>
          <p>— CineBook Team 🎬</p>
        `
      });
    }

   
    res.json({ message: "Booking cancelled successfully" });

  } catch (err) {
    console.error("CANCEL BOOKING ERROR:", err);
    res.status(500).json({ message: "Cancel failed" });
  }
});


router.post("/confirm", auth, async (req, res) => {
  try {
    console.log("REQ.USER 👉", req.user);

    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const { showId, seats } = session.metadata;
    const seatArray = seats.split(",");

    // 🔒 LOCK SEATS (same logic as normal booking)
    const updatedShow = await Show.findOneAndUpdate(
      {
        _id: showId,
        bookedSeats: { $not: { $elemMatch: { $in: seatArray } } }
      },
      {
        $addToSet: { bookedSeats: { $each: seatArray } }
      },
      { new: true }
    );

    if (!updatedShow) {
      return res.status(400).json({ message: "Seats already booked" });
    }

    const show = await Show.findById(showId).populate("movie");

    const totalAmount = session.amount_total / 100;

    // ✅ CREATE BOOKING (FIXED user field)
    const booking = await Booking.create({
      user: req.user.id,
      show: show._id,
      seats: seatArray,
      totalAmount,
      status: "confirmed",
    });

    await booking.populate({
      path: "show",
      populate: { path: "movie" }
    });

    // 📧 SEND EMAIL
    const user = await User.findById(req.user.id);

    if (user?.email) {
      await sendEmail({
        to: user.email,
        subject: "🎟 CineBook Ticket Confirmed",
        html: `
          <h2>Booking Confirmed 🎬</h2>
          <p><strong>Movie:</strong> ${booking.show.movie.title}</p>
          <p><strong>Theatre:</strong> ${booking.show.theatreName}</p>
          <p><strong>Screen:</strong> ${booking.show.location || "N/A"}</p>
          <p><strong>Show Time:</strong> ${new Date(
            booking.show.showTime
          ).toLocaleString()}</p>
          <p><strong>Seats:</strong> ${booking.seats.join(", ")}</p>
          <p><strong>Total:</strong> ₹${booking.totalAmount}</p>
        `
      });
    }

    res.json(booking);

  } catch (err) {
    console.error("CONFIRM BOOKING ERROR FULL 👉", err);
    res.status(500).json({ message: "Booking confirmation failed" });
  }
});






module.exports = router;
