require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

  const admin = new User({
    email: "admin@gmail.com",
    firstName: "Admin",
    lastName: "User",
    password: "admin123", // model hashes automatically
    role: "admin"
  });

  await admin.save();

  console.log("✅ Admin Created");
  process.exit();
});