module.exports.matricQuery = async (req, res) => {
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
}