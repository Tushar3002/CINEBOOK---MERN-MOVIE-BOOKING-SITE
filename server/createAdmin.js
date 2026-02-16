require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const connectDB = require("./config/db");

const run = async () => {
  await connectDB();
  const email = "admin@movie.com";
  const exist = await User.findOne({ email });
  if (exist) {
    console.log("Admin already exists");
    return process.exit(0);
  }
  const hashed = await bcrypt.hash("admin123", 10);
  const admin = await User.create({
    name: "Admin",
    email,
    password: hashed,
    role: "admin",
  });
  console.log("Admin created:", admin.email, "password: admin123");
  process.exit(0);
};

run();
