const mongoose = require("mongoose");
const SupervisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  token: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Token",
  },
});

module.exports = mongoose.model("Supervisor", SupervisorSchema);
