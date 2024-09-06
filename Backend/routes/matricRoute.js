const express = require('express');
const Student = require('../models/student');
const requireAuth = require("../middleware/requireAuth");
const matricController = require("../controllers/matricController.js");

const router = express.Router();



//just for adding student details to the database
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


router.post('/student', requireAuth, matricController.matricQuery);

module.exports = router;
