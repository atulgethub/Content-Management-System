require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Make sure path is correct
const connectDB = require("./config/db");

// Connect to MongoDB
connectDB();

async function createAdmin() {
  try {
    const email = "admin@example.com";
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Admin already exists!");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("12345678", 10);

    const admin = new User({
      firstName: "Admin",
      lastName: "User",
      email: email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();