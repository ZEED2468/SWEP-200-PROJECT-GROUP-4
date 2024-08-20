const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  matricNumber: {  
    type: String,
    required: true,
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  department: { 
    type: String, 
    required: true 
  },
  faculty: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  profilePic_url: { 
    type: String,
    required: true
  }
  }, { 
    timestamps: true
  });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
