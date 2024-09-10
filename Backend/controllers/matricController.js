// const Student = require('../models/StudentModel');

// module.exports.matricQuery = async (req, res) => {
//     const matric = req.body.matric;
//     try {
//         const student = await Student.findOne({ matricNo: matric });
//         if (student) {
//             res.json(student);
//         } else {
//             res.status(404).json({ message: 'student not found' });
//         }
//     } catch (err) {
//         res.status(500).json({ message: 'server error' })
//     }
// }


const Student = require('../models/StudentModel');

module.exports.matricQuery = async (req, res) => {
  const matric = req.body.matric;

  try {
    const student = await Student.findOne({ matricNo: matric }).select('-descriptor1 -descriptor2');

    if (student) {
      // Exclude image2 from response
      const { image2, ...studentWithoutImage2 } = student.toObject();
      return res.status(200).json(studentWithoutImage2);
    } else {
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    console.error('Error during matric number query:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};


  
  
