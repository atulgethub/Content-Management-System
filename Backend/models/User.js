const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  }
});


/* ================= PASSWORD HASH ================= */
userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


/* ================= PASSWORD MATCH ================= */
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


module.exports =
  mongoose.models.User || mongoose.model("User", userSchema);