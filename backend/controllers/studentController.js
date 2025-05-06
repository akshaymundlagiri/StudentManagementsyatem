const Student = require('../models/studentModel');

const getStudents = async (req, res) => {
  const students = await Student.find();
  res.json(students);
};

const addStudent = async (req, res) => {
  const { name } = req.body;
  const student = new Student({ name });
  await student.save();
  res.status(201).json(student);
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.status(204).end();
};

module.exports = { getStudents, addStudent, deleteStudent };

