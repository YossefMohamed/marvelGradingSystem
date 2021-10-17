const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    class : {
      type : String,
      required :true
    },
isSubmitted:{
  type:Boolean,
  default:false
}
    ,
    permission: [
      {
        type: String,
        enum: ["teacher", "head", "admin"],
        default: "teacher",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
