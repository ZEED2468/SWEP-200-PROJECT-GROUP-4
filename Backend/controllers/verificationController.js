const faceapi = require('face-api.js');
const { Canvas, Image, ImageData } = require('canvas');
const StudentModel = require('../models/StudentModel'); // Import your student model
const { createCanvas } = require('canvas');

// Setup face-api.js with canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Helper function to convert the descriptor from the DB to a Float32Array
function convertDescriptor(descriptorString) {
  return new Float32Array(descriptorString.split(',').map(parseFloat));
}

// Face Verification Function
const verifyFace = async (req, res) => {
  const { descriptor1, descriptor2 } = req.body; // descriptors from frontend
  
  if (!descriptor1 || !descriptor2) {
    return res.status(400).json({ message: 'Both descriptors are required' });
  }

  try {
    // Retrieve all students from the database
    const students = await StudentModel.find({});
    
    // Iterate over each student and compare face descriptors
    for (const student of students) {
      const storedDescriptor1 = convertDescriptor(student.descriptor1); // from DB
      const storedDescriptor2 = convertDescriptor(student.descriptor2); // from DB

      // Compare both descriptors with the provided ones from the frontend
      const distance1 = faceapi.euclideanDistance(storedDescriptor1, convertDescriptor(descriptor1));
      const distance2 = faceapi.euclideanDistance(storedDescriptor2, convertDescriptor(descriptor2));

      // If the distance is lower than 0.5, it's considered a match
      const threshold = 0.5;
      if (distance1 < threshold && distance2 < threshold) {
        return res.status(200).json({
          message: 'Face verified successfully',
          student,
        });
      }
    }

    // If no match is found
    return res.status(401).json({ message: 'Face verification failed' });

  } catch (error) {
    console.error('Error during face verification:', error);
    return res.status(500).json({ message: 'An error occurred during face verification' });
  }
};

module.exports = { verifyFace };
