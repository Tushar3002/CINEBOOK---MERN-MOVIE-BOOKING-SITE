const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
    theatreName: { type: String, required: true },
    location: String,
    showTime: { type: Date, required: true },
    pricePerSeat: { type: Number, required: true },
    totalSeats: { type: Number, required: true, default: 100 },
    bookedSeats: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Show", showSchema);
