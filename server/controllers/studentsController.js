const Marks = require("../models/Marks");
const Student = require("../models/Student");
const log = require("../services/Logger");

async function handleAddStudent(req, res) {
  const { name, emis, clss, roll, year } = req.body;

  try {
    await Student.create({ name, emis, clss, roll, year });
    return res.status(201).json({ message: ["Student added successfully!"] });
  } catch (error) {
    log(`handleAddStudents: ${error}`);
    return res
      .status(500)
      .json({ message: ["Failed to add student. Something went wrong"] });
  }
}

async function handleGetStudents(req, res) {
  const year = req.params.year;
  const clss = req.params.clss;

  try {
    const students = await Student.find({ year: year, clss: clss });
    if (students.length === 0) {
      return res.status(404).json({
        message: [`Students not found for year ${year} and class ${clss}`],
      });
    }

    return res.status(200).json({ message: ["Success"], data: students });
  } catch (error) {
    log(`handleGetStudents: ${error}`);

    return res.status(500).json({ message: ["Something went wrong"] });
  }
}

async function handleUpdateStudent(req, res) {
  try {
    const existingStudent = await Student.findById(req.body.stuId);

    if (!existingStudent) {
      return res.status(404).json({ message: ["Student doesn't exists"] });
    }

    await Student.findByIdAndUpdate(req.body.stuId, {
      name: req.body.name,
      emis: req.body.emis,
      clss: req.body.clss,
      roll: req.body.roll,
      year: req.body.year,
    });
    return res.status(200).json({ message: ["Updated Successfully"] });
  } catch (error) {
    log(`handleUpdateStudent: ${error}`);
    return res.status(500).json({ message: ["Failed to update student data"] });
  }
}

async function handleDeleteStudent(req, res) {
  const id = req.params.stuId;
  try {
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(500).json({ message: ["Student not found"] });
    }
    await Marks.deleteMany({ student: id });
    return res.status(200).json({ message: ["Successfully Deleted"] });
  } catch (error) {
    log(`handleDeleteStudent: ${error}`);
    return res.status(500).json({ message: ["Failed to delete student"] });
  }
}

module.exports = {
  handleAddStudent,
  handleGetStudents,
  handleUpdateStudent,
  handleDeleteStudent,
};
