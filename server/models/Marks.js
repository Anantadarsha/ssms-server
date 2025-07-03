const { Schema, model } = require("mongoose");

const MarksSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    examYear: {
      type: Number,
      required: true,
    },
    examTerm: {
      type: String,
      required: true,
    },
    clss: {
      type: Number,
      required: true,
    },
    npth: {
      type: Number,
      required: true,
    },
    nppr: {
      type: Number,
      required: true,
    },
    enth: {
      type: Number,
      required: true,
    },
    enpr: {
      type: Number,
      required: true,
    },
    mtth: {
      type: Number,
      required: true,
    },
    mtpr: {
      type: Number,
      required: true,
    },
    snth: {
      type: Number,
      required: true,
    },
    snpr: {
      type: Number,
      required: true,
    },
    vdth: {
      type: Number,
      required: true,
    },
    vdpr: {
      type: Number,
      required: true,
    },
    vyth: {
      type: Number,
      required: true,
    },
    vypr: {
      type: Number,
      required: true,
    },
    kkth: {
      type: Number,
    },
    kkpr: {
      type: Number,
    },
    soth: {
      type: Number,
    },
    sopr: {
      type: Number,
    },
    thGPs: {
      type: Schema.Types.Array,
      required: true,
    },
    prGPs: {
      type: Schema.Types.Array,
      required: true,
    },
    grade: {
      type: Schema.Types.Array,
      required: true,
    },
    gpa: {
      type: Number,
      required: true,
    },
    thGL: {
      type: Schema.Types.Array,
      required: true,
    },
    prGL: {
      type: Schema.Types.Array,
      required: true,
    },
    fGL: {
      type:Schema.Types.Array,
      required: true,
    }
  },
  { timestamps: true }
);

const Marks = model("marks", MarksSchema);
module.exports = Marks;
