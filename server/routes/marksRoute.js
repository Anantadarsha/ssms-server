const express = require("express");
const { handleMarksEntry, handleGetMarksLedger, handleGetMarksheet, handleUpdateMarks, handleDeleteMarks } = require("../controllers/marksController");
const { validateMarks } = require("../middlewares/Validation");
const calculateGrade = require("../middlewares/Calculation");

const router = express.Router();

router.post("/", validateMarks, calculateGrade, handleMarksEntry);
router.get("/:examYear/:clss/:term/", handleGetMarksLedger);
router.get("/:examYear/:clss/:examTerm/:stuId/", handleGetMarksheet);
router.put("/", validateMarks, calculateGrade, handleUpdateMarks);
router.delete("/:marksId", handleDeleteMarks);

module.exports = router;
