const StudentModel = require("../models/StudentModel"); // Import the Student model

const registerStudent = async (req, res) => {
  try {
    const {
      name,
      matricNo,
      department,
      faculty,
      currentPart,
      semester,
      courses,
      descriptor1,
      descriptor2
    } = req.body;

    let parsedCourses;
    try {
      parsedCourses = JSON.parse(courses);
    } catch (err) {
      return res.status(400).json({ message: "Invalid courses format" });
    }

    if (!req.files || !req.files.image1 || !req.files.image2) {
      return res.status(400).json({ message: "Both image1 and image2 are required." });
    }

    const image1 = req.files.image1[0].path;
    const image2 = req.files.image2[0].path;

    const student = new StudentModel({
      name,
      matricNo,
      department,
      faculty,
      currentPart,
      semester,
      courses: parsedCourses,
      descriptor1,
      descriptor2,
      image1,
      image2,
    });

    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

module.exports = {
  registerStudent,
};
