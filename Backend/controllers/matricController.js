const Student = require('../models/StudentModel');

module.exports.matricQuery = async (req, res) => {
    const matric = req.body.matric;
    try {
        const student = await Student.findOne({ matricNo: matric });
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ message: 'student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'server error' })
    }
}