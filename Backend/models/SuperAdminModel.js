const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const SuperAdminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SuperAdminSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("SuperAdmin", SuperAdminSchema);
