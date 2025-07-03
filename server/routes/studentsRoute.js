const express = require("express");
const router = express.Router();
const { handleAddStudent, handleGetStudents, handleUpdateStudent, handleDeleteStudent } = require("../controllers/studentsController");
const { validateStudent } = require("../middlewares/Validation");

router.post("/", validateStudent, handleAddStudent);
router.get("/:year/:clss", handleGetStudents);
router.put("/", validateStudent, handleUpdateStudent);
router.delete("/:stuId", handleDeleteStudent);


module.exports = router;
