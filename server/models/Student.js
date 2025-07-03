const { Schema, model } = require("mongoose");
const StudentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emis: {
      type: String,
      required: true,
    },
    clss: {
      type: String,
      required: true,
    },
    roll: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Student = model("students", StudentSchema);
module.exports = Student;
