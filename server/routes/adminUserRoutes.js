const express = require("express");
const User = require("../models/User");
const { auth, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * GET all users (ADMIN ONLY)
 */
router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find()
      .select("-password") // never send passwords
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    console.error("FETCH USERS ERROR:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

/**
 * DELETE user by ID (ADMIN ONLY)
 */
router.delete("/users/:id", auth, isAdmin, async (req, res) => {
  try {
    // prevent admin from deleting themselves
    if (req.user.id === req.params.id) {
      return res.status(400).json({ message: "You cannot delete yourself" });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("DELETE USER ERROR:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
