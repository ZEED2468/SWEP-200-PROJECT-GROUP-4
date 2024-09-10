const faceapi = require('face-api.js');
const { Canvas, Image, ImageData } = require('canvas');
const StudentModel = require('../models/StudentModel'); // Import your student model

// Setup face-api.js with canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Helper function to convert the descriptor from the DB to a Float32Array
function convertDescriptor(descriptorString) {
  return new Float32Array(descriptorString.split(',').map(parseFloat));
}

// Helper function to log descriptor details
function logDescriptorDetails(descriptor, label) {
  console.log(`${label} Descriptor:`, descriptor);
  console.log(`${label} Descriptor Length:`, descriptor.length);
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
    
    // Convert input descriptors
    const inputDescriptor1 = convertDescriptor(descriptor1);
    const inputDescriptor2 = convertDescriptor(descriptor2);
    logDescriptorDetails(inputDescriptor1, 'Input 1');
    logDescriptorDetails(inputDescriptor2, 'Input 2');

    // Iterate over each student and compare face descriptors
    for (const student of students) {
      const storedDescriptor1 = convertDescriptor(student.descriptor1); // from DB
      const storedDescriptor2 = convertDescriptor(student.descriptor2); // from DB
      
      logDescriptorDetails(storedDescriptor1, 'Stored 1');
      logDescriptorDetails(storedDescriptor2, 'Stored 2');
      
      // Ensure descriptors are of the same length
      if (inputDescriptor1.length !== storedDescriptor1.length ||
          inputDescriptor2.length !== storedDescriptor2.length) {
        console.error('Descriptor lengths do not match.');
        continue;
      }

      // Compare both descriptors with the provided ones from the frontend
      const distance1 = faceapi.euclideanDistance(storedDescriptor1, inputDescriptor1);
      const distance2 = faceapi.euclideanDistance(storedDescriptor2, inputDescriptor2);

      console.log('Distance 1:', distance1);
      console.log('Distance 2:', distance2);

      // If the distance is lower than 0.8, it's considered a match
      const threshold = 0.8;
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
