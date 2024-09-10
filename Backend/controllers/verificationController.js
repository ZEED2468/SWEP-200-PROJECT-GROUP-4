const faceapi = require('face-api.js');
const { Canvas, Image, ImageData } = require('canvas');
const StudentModel = require('../models/StudentModel');

// Setup face-api.js with canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Helper function to convert the descriptor from the DB to a Float32Array
function convertDescriptor(descriptorString) {
  return new Float32Array(descriptorString.split(',').map(value => {
    const parsedValue = parseFloat(value);
    return isNaN(parsedValue) ? 0 : parsedValue; // Handle NaN values
  }));
}

// Helper function to log descriptor details
function logDescriptorDetails(descriptor, label) {
  console.log(`${label} Descriptor:`, descriptor);
  console.log(`${label} Descriptor Length:`, descriptor.length);
}

// Euclidean distance calculation
function calculateEuclideanDistance(desc1, desc2) {
  return Math.sqrt(desc1.reduce((sum, value, index) => sum + Math.pow(value - desc2[index], 2), 0));
}

// Face Verification Function
const verifyFace = async (req, res) => {
  const { descriptor1, descriptor2 } = req.body;

  if (!descriptor1 || !descriptor2) {
    return res.status(400).json({ message: 'Both descriptors are required' });
  }

  try {
    const students = await StudentModel.find({});

    const inputDescriptor1 = convertDescriptor(descriptor1);
    const inputDescriptor2 = convertDescriptor(descriptor2);

    logDescriptorDetails(inputDescriptor1, 'Input 1');
    logDescriptorDetails(inputDescriptor2, 'Input 2');

    for (const student of students) {
      const storedDescriptor1 = convertDescriptor(student.descriptor1);
      const storedDescriptor2 = convertDescriptor(student.descriptor2);

      logDescriptorDetails(storedDescriptor1, 'Stored 1');
      logDescriptorDetails(storedDescriptor2, 'Stored 2');

      if (inputDescriptor1.length !== storedDescriptor1.length || inputDescriptor2.length !== storedDescriptor2.length) {
        console.error('Descriptor lengths do not match.');
        continue;
      }

      const distance1 = calculateEuclideanDistance(storedDescriptor1, inputDescriptor1);
      const distance2 = calculateEuclideanDistance(storedDescriptor2, inputDescriptor2);

      console.log('Calculated Distance 1:', distance1);
      console.log('Calculated Distance 2:', distance2);

      const threshold = 0.5;
      console.log('Threshold:', threshold);

      if (distance1 < threshold && distance2 < threshold) {
        console.log('Face verified successfully. Distances are below the threshold.');
        return res.status(200).json({
          success: true,
          message: 'Face verified successfully',
          student,
        });
      } else {
        console.log('Distances exceed threshold. Face not verified.');
      }
    }

    return res.status(401).json({
      success: false,
      message: 'Face verification failed'
    });

  } catch (error) {
    console.error('Error during face verification:', error);
    return res.status(500).json({ message: 'An error occurred during face verification' });
  }
};

module.exports = { verifyFace };
