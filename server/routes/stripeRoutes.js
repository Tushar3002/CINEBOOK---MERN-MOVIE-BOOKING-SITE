const express = require("express");
const Stripe = require("stripe");

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, showId, seats } = req.body;

    // 🔐 Basic validation
    if (!amount || !showId || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Invalid checkout data" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Movie Ticket Booking",
              description: `Seats: ${seats.join(", ")}`,
            },
            unit_amount: amount * 100, // ₹ → paise
          },
          quantity: 1,
        },
      ],

      // ✅ THIS IS VERY IMPORTANT
      metadata: {
        showId: showId,
        seats: seats.join(","),
      },

      success_url: `http://localhost:5173/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/book/${showId}`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("STRIPE CHECKOUT ERROR:", err);
    res.status(500).json({ message: "Stripe checkout failed" });
  }
});

module.exports = router;
