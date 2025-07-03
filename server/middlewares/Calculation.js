const log = require("../services/Logger");

function calculatePercentage(marksArr, clss, type) {
  const percentArr = [];

  if (type === "th") {
    if (clss <= 8) {
      marksArr.forEach((mrks) => {
        percent = (mrks / 50) * 100;
        percentArr.push(percent.toFixed(2));
      });
    }

    if (clss >= 9) {
      marksArr.forEach((mrks) => {
        percent = (mrks / 75) * 100;
        percentArr.push(percent.toFixed(2));
      });
    }
  } else {
    if (clss <= 8) {
      marksArr.forEach((mrks) => {
        percent = (mrks / 50) * 100;
        percentArr.push(percent.toFixed(2));
      });
    }

    if (clss >= 9) {
      marksArr.forEach((mrks) => {
        percent = (mrks / 25) * 100;
        percentArr.push(percent.toFixed(2));
      });
    }
  }
  return percentArr;
}

function getGradePoint(marks) {
  if (marks >= 90) {
    return 4.0;
  } else if (marks >= 80 && marks < 90) {
    return 3.6;
  } else if (marks >= 70 && marks < 80) {
    return 3.2;
  } else if (marks >= 60 && marks < 70) {
    return 2.8;
  } else if (marks >= 50 && marks < 60) {
    return 2.4;
  } else if (marks >= 40 && marks < 50) {
    return 2.0;
  } else if (marks >= 35 && marks < 40) {
    return 1.6;
  } else {
    return 0;
  }
}

function calculateAverageGrade(thGradePoint, prGradePoint) {
  const avg = [];
  for (var i = 0; i < thGradePoint.length; i++) {
    var a = (thGradePoint[i] + prGradePoint[i]) / 2;
    avg.push(a);
  }
  return avg;
}

function calculateGPA(grade) {
  //nep, eng, mth, sanlang, ved, vyakaran, kk, social
  const creditHour = [5, 5, 5, 3, 4, 5, 5, 5];
  var total = 0;

  for (var i = 0; i < grade.length; i++) {
    total = total + creditHour[i] * grade[i];
  }

  const GPA = total / 32;

  return GPA;
}

function calculateGradeLetter(marks) {
  // if (type == "percentage") {
  //   if (marks >= 90) {
  //     return "A+";
  //   } else if (marks >= 80 && marks < 90) {
  //     return "A";
  //   } else if (marks >= 70 && marks < 80) {
  //     return "B+";
  //   } else if (marks >= 60 && marks < 70) {
  //     return "B";
  //   } else if (marks >= 50 && marks < 60) {
  //     return "C+";
  //   } else if (marks >= 40 && marks < 50) {
  //     return "C";
  //   } else if (marks >= 35 && marks < 40) {
  //     return "D";
  //   } else if (marks >= 0 && marks < 35) {
  //     return "NG";
  //   } else {
  //     return -1;
  //   }
  // }

  if (marks >= 3.61) {
    return "A+";
  } else if (marks >= 3.21 && marks <= 3.6) {
    return "A";
  } else if (marks >= 2.81 && marks <= 3.2) {
    return "B+";
  } else if (marks >= 2.41 && marks <= 2.8) {
    return "B";
  } else if (marks >= 2.01 && marks <= 2.4) {
    return "C+";
  } else if (marks >= 1.61 && marks <= 2.0) {
    return "C";
  } else if (marks == 1.6) {
    return "D";
  } else if (marks >= 0 && marks < 1.6) {
    return "NG";
  } else {
    return -1;
  }
}

function calculateGrade(req, res, next) {
  try {
    const m = req.body;

    const thMarks = [
      m.npth,
      m.enth,
      m.mtth,
      m.snth,
      m.vdth,
      m.vyth,
      m.kkth,
      m.soth,
    ];
    const prMarks = [
      m.nppr,
      m.enpr,
      m.mtpr,
      m.snpr,
      m.vdpr,
      m.vypr,
      m.kkpr,
      m.sopr,
    ];

    const thPercent = calculatePercentage(thMarks, m.clss, "th");
    const prPercent = calculatePercentage(prMarks, m.clss, "pr");

    const thGradePoint = [];
    const prGradePoint = [];

    thPercent.forEach((p) => thGradePoint.push(getGradePoint(p)));
    prPercent.forEach((p) => prGradePoint.push(getGradePoint(p)));

    const thGradeLetter = [];
    const prGradeLetter = [];
    const finalGradeLetter = [];

    thGradePoint.forEach((p) => thGradeLetter.push(calculateGradeLetter(p)));
    prGradePoint.forEach((p) => prGradeLetter.push(calculateGradeLetter(p)));

    const Grade = calculateAverageGrade(thGradePoint, prGradePoint);
    Grade.forEach((g) => finalGradeLetter.push(calculateGradeLetter(g)));

    const GPA = calculateGPA(Grade);

    req.body.thGPs = thGradePoint;
    req.body.prGPs = prGradePoint;
    req.body.grade = Grade;
    req.body.gpa = GPA;
    req.body.thGL = thGradeLetter;
    req.body.prGL = prGradeLetter;
    req.body.fGL = finalGradeLetter;
    
 
  } catch (error) {
    log(`calculateGrade: ${error}`);
    return res
      .status(422)
      .json({ message: ["Something went wrong while calculating grade"] });
  }

  next();
}

module.exports = calculateGrade;
