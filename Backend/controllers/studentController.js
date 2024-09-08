const StudentModel = require("../models/StudentModel"); // Import the Student model

const registerStudent = async (req, res) => {
  try {
    // Log the incoming request body and files for debugging
    console.log("Request body:", req.body);
    console.log("Files:", req.files);

    const {
      name,
      matricNo,
      department,
      faculty,
      currentPart,
      semester,
      courses,  // Keep parsing courses as an array
      descriptor1,  // Now treat this as a string
      descriptor2,  // Now treat this as a string
    } = req.body;

    // Parse courses only (as they are sent as JSON array)
    let parsedCourses;
    try {
      parsedCourses = JSON.parse(courses);  // Courses are still sent as JSON array
    } catch (err) {
      console.error("Error parsing courses:", err);
      return res.status(400).json({ message: "Invalid courses format" });
    }

    // Ensure images are present
    if (!req.files || !req.files.image1 || !req.files.image2) {
      return res.status(400).json({ message: "Both image1 and image2 are required." });
    }

    // Extract the image paths from the uploaded files
    const image1 = req.files.image1[0].path;
    const image2 = req.files.image2[0].path;

    // Create new student entry
    const student = new StudentModel({
      name,
      matricNo,
      department,
      faculty,
      currentPart,
      semester,
      courses: parsedCourses,  // Store courses as an array
      descriptor1,  // Store descriptor1 as a string
      descriptor2,  // Store descriptor2 as a string
      image1,  // Store image1 path
      image2,  // Store image2 path
    });

    // Save the student data to the database
    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Error during student registration:", error.message);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

module.exports = {
  registerStudent,
};
