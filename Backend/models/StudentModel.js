const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  matricNo: { type: String, required: true },
  department: { type: String, required: true },
  faculty: { type: String, required: true },
  currentPart: { type: String, required: true },
  semester: { type: String, required: true },
  courses: { type: [String], required: true },
  descriptor1: { type: String, required: true },
  descriptor2: { type: String, required: true },
  image1: { type: String, required: true }, // Stores file path
  image2: { type: String, required: true }  // Stores file path
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
