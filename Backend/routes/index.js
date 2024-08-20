const express = require('express');
const Student = require('../models/student');

const router = express.Router();

// Route to get student details by matric number
router.get('/', (req, res) => {
  rss.render("index");
});

//add student
router.get('/add-student', (req, res) => {
  const student = new Student({
    matricNumber: 'CSC/2021/186',
    name: 'Taiwo Samuel Oluwatayo',
    department: 'Computer Science and Engineering',
    faculty: 'Technology',
    email: 'samueltaiwo@oauife.edu.ng',
    profilePic_url: 'samuel.jpeg'
  });
  
  student.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// redirect from the form post request
// router.post('/student', (req, res) => {
//   const matric = req.body.matric;
  

// });

router.post('/student', async (req, res) => {
  const matric = req.body.matric;
  try {
    const student = await Student.findOne({ matricNumber: matric });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// router.get('/student/:matric', (req, res) => {
//   const matric = req.params.matric;
  
//   res.send(matric);
// });

//export default router;
module.exports = router;
