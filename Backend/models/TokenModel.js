const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  superadmin_id: {
    type: mongoose.Schema.Types.ObjectId, ///ref an event model id
    ref: "SuperAdmin",
  },
  token: {
    type: String,
    unique: true,
    maxlength: 6,
  },
  tokenCreatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Token", TokenSchema);
