const Marks = require("../models/Marks");
const log = require("../services/Logger");

async function handleMarksEntry(req, res) {
  try {
    const data = req.body;
    const clss = data.clss;
    // console.log(data)

    await Marks.create({
      student: data.stuId,
      examYear: data.examYear,
      examTerm: data.examTerm,
      clss: clss,
      npth: data.npth,
      nppr: data.nppr,
      enth: data.enth,
      enpr: data.enpr,
      mtth: data.mtth,
      mtpr: data.mtpr,
      snth: data.snth,
      snpr: data.snpr,
      vdth: data.vdth,
      vdpr: data.vdpr,
      vyth: data.vyth,
      vypr: data.vypr,
      kkth: clss >= 8 ? data.kkth : -1,
      kkpr: clss >= 8 ? data.kkpr : -1,
      soth: clss <= 7 ? data.soth : -1,
      sopr: clss <= 7 ? data.sopr : -1,
      thGPs: data.thGPs,
      prGPs: data.prGPs,
      grade: data.grade,
      gpa: data.gpa,
      thGL: data.thGL,
      prGL: data.prGL,
      fGL: data.fGL,
    });

    return res.status(201).json({ message: ["Marks added successfully"] });
  } catch (error) {
    log(`handleMarksEntry: ${error}`);
    return res
      .status(500)
      .json({ message: ["Some error occured during adding marks"] });
  }
}

async function handleGetMarksLedger(req, res) {
  const examYear = req.params.examYear;
  const clss = req.params.clss;
  const examTerm = req.params.term;

  try {
    const data = await Marks.find({ examYear, clss, examTerm })
      .select("-thGPs -prGPs -grade -createdAt -updatedAt")
      .populate({
        path: "student",
        select: "-clss -year -createdAt, -updatedAt",
      });
    if (!data) {
      return res.status(404).json({ message: ["Not found"] });
    }
    return res.status(200).json({ ledger: data });
  } catch (error) {
    log(`handleGetMarksLedger: ${error}`);
    // console.log(error);
    return res
      .status(500)
      .json({ message: ["Something went wrong while loading data"] });
  }
}

async function handleGetMarksheet(req, res) {
  const examYear = req.params.examYear;
  const clss = req.params.clss;
  const examTerm = req.params.examTerm;
  const student = req.params.stuId;

  try {
    const data = await Marks.find({ examYear, examTerm, clss, student })
      .select({ thGL: 1, prGL: 1, grade: 1, gpa: 1, fGL: 1 })
      .populate({
        path: "student",
        select: "-clss -year -createdAt, -updatedAt",
      });

    return res.status(200).json({ marksheet: data });
  } catch (error) {
    log(`handleGetMarksheet: ${error}`);
    return res.status(500).json({
      message: ["An internal error occured while fetching marksheet"],
    });
  }
}

async function handleUpdateMarks(req, res) {
  try {
    const data = req.body;
    const clss = data.clss;

    const existingMarks = await Marks.findById(req.body.marksId);

    if (!existingMarks) {
      return res
        .status(404)
        .json({ message: ["Student marks doesn't exists"] });
    }

    await Marks.findByIdAndUpdate(req.body.marksId, {
      student: data.stuId,
      examYear: data.examYear,
      examTerm: data.examTerm,
      clss: clss,
      npth: data.npth,
      nppr: data.nppr,
      enth: data.enth,
      enpr: data.enpr,
      mtth: data.mtth,
      mtpr: data.mtpr,
      snth: data.snth,
      snpr: data.snpr,
      vdth: data.vdth,
      vdpr: data.vdpr,
      vyth: data.vyth,
      vypr: data.vypr,
      kkth: clss >= 8 ? data.kkth : -1,
      kkpr: clss >= 8 ? data.kkpr : -1,
      soth: clss <= 7 ? data.soth : -1,
      sopr: clss <= 7 ? data.sopr : -1,
      thGPs: data.thGPs,
      prGPs: data.prGPs,
      grade: data.grade,
      gpa: data.gpa,
      thGL: data.thGL,
      prGL: data.prGL,
      fGL: data.fGL,
    });
    return res.status(200).json({ message: ["Updated Successfully"] });
  } catch (error) {
    log(`handleUpdateMarks: ${error}`);
    return res.status(500).json({ message: ["Failed to update student data"] });
  }
}

async function handleDeleteMarks(req, res) {
  const id = req.params.marksId;
  try {
    const deletedMarks = await Marks.deleteMany(id);

    if (!deletedMarks) {
      return res.status(500).json({ message: ["Marks not found"] });
    }
    return res.status(200).json({ message: ["Successfully Deleted"] });
  } catch (error) {
    log(`handleDeleteMarks: ${error}`);

    return res.status(500).json({ message: ["Failed to delete marks"] });
  }
}

module.exports = {
  handleMarksEntry,
  handleGetMarksLedger,
  handleGetMarksheet,
  handleUpdateMarks,
  handleDeleteMarks,
};
