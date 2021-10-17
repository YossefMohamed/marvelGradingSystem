const mongoose = require("mongoose");

const markSchema = mongoose.Schema(
  {
    totalMark: {
      type: Number,
      required: true,
    },
    studentMark: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    class: {
      type: String,
      required: true,
      ref: "Class",
    },

    permission: {
      type: String,
      enum: ["Teacher", "Head", "Leader", "Admin"],
      default: "Head",
    },
    subject: {
      type: String,
      required: true,
      ref: "",
    },
    percentage: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
markSchema.pre("save", async function (next) {
  if (this.studentMake > this.totalMark)
    return new Error("Student mark has to be lass than total mark");
  this.percentage = (this.studentMake / this.totalMark) * 100;
  next();
});

const Mark = mongoose.model("Mark", markSchema);
module.exports = Mark;
