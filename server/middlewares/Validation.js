const Student = require("../models/Student");
const log = require("../services/Logger");

function validateStudent(req, res, next) {
  const { name, emis, roll } = req.body;
  const error = [];

  if (!name || !name.trim()) {
    error.push("Name cannot be empty!");
  }

  if (!emis || !emis.trim()) {
    error.push("EMIS cannot be empty!");
  }

  if (!roll || !roll.trim()) {
    error.push("Roll Number cannot be empty!");
  } else if (isNaN(roll)) {
    error.push("Roll Number must be a number!");
  }

  if (error.length >= 1) {
    return res.status(422).json({ message: error });
  }
log(`validateStudent: ${error}`);
  next();
}

async function validateMarks(req, res, next) {
  const m = req.body;
  var empty = 0;
  var stuId = m.stuId;
  var stuClass = 0;
  try {
    stuClass = await Student.findById({ _id: stuId }).select({ clss: 1 });
    
    //make kk = -1 if clss <= 7 or ss = -1 if clss >=8
    if(parseInt(stuClass.clss) <= 7){
      req.body.kkth = -1;
      req.body.kkpr = -1;
    } else if(parseInt(stuClass.clss) >=8){
      req.body.soth = -1;
      req.body.sopr = -1;
    }

    req.body.clss = parseInt(stuClass.clss);

  } catch (error) {
    log(`validateMarks: ${error}`);
    return res
      .status(500)
      .json({ message: ["Something went wrong while validating data"] });
  }

  if (
    parseInt(stuClass.clss) >= 8 &&
    (!m.kkth || !m.kkth.trim() || !m.kkpr || !m.kkpr.trim())
  ) {
    return res.status(422).json({
      message: ["Karmakanda is the cumpolsary subject for class 8, 9 and 10"],
    });
  }

  if (
    parseInt(stuClass.clss) <= 7 &&
    (!m.soth || !m.soth.trim() || !m.sopr || !m.sopr.trim())
  ) {
    return res.status(422).json({
      message: ["Social is the cumpolsary subject for class 5, 6 and 7"],
    });
  }

  if (!m.npth || !m.npth.trim() || !m.nppr || !m.nppr.trim()) {
    empty++;
  }

  if (!m.enth || !m.enth.trim() || !m.enpr || !m.enpr.trim()) {
    empty++;
  }

  if (!m.mtth || !m.mtth.trim() || !m.mtpr || !m.mtpr.trim()) {
    empty++;
  }
  if (!m.snth || !m.snth.trim() || !m.snpr || !m.snpr.trim()) {
    empty++;
  }
  if (!m.vdth || !m.vdth.trim() || !m.vdpr || !m.vdpr.trim()) {
    empty++;
  }
  if (!m.vyth || !m.vyth.trim() || !m.vypr || !m.vypr.trim()) {
    empty++;
  }

  if (empty > 0) {
    return res.status(422).json({ message: ["Input fields cannot be empty"] });
  }

  next();
}

module.exports = {
  validateStudent,
  validateMarks,
};
