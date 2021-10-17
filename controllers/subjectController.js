const Mark = require("../models/mark");
const Subject = require("../models/subject");
const User = require("../models/user");

exports.getSubject = async (req, res) => {
  const subject = await Subject.findOne({
    name: req.params.subjectId,
    class: req.params.classId,
  });
  const marks = await Mark.find({
    class: req.params.classId,
    subject: req.params.subjectId,
  }).populate("student");
  const students = await User.find({
    type: "Student",
    class: req.params.classId,
  }).populate("marks");
  res.render("y1a.ejs", {
    me: req.user,
    students,
    subject: req.params.subjectId,
    CurrentSubject: subject,
    currentClass: req.params.classId,
    marks,
  });
};

exports.addSubject = async (req, res) => {
  try {
    if (
      req.user.type !== "Head" ||
      req.user.type !== "Leader" ||
      req.user.type !== "Admin"
    ) {
    }
    const subject = await Subject.create({
      name: req.body.subject ? req.body.subject : req.user.subject,
      class: req.params.classId,
    });

    res.status(200).redirect(`/class/${req.params.classId}`);
  } catch (error) {
    res.send("error");
  }
};

exports.addMark = async (req, res) => {
  try {
    let marks = [];
    let count = 1;
    let tm;
    let sm;
    for (const [key, value] of Object.entries(req.body)) {
      if (isNaN(value)) throw new Error("Please Enter A Number :((((((");

      if (count % 2) {
        marks[count - 1] = {
          totalMark: value * 1,
        };
        tm = value * 1;
      } else {
        if (!value) throw new Error("Fill All The Fields !");
        sm = value * 1;
        marks[count - 2] = {
          ...marks[count - 2],
          studentMark: value * 1,
          name: key.split(" ")[0],
          student: req.params.studentId,
          class: req.params.classId,
          subject: req.params.subjectId,
        };
        if (sm > tm)
          throw new Error("Student Mark Cant Be More Than Total Mark :)");
      }
      count++;
    }
    marks = marks.filter((mark) => !!mark);
    // console.log(marks);

    const addedMarks = await Mark.insertMany(marks);
    const user = await User.findById(req.params.studentId).populate("marks");
    user.markAdd = [...user.markAdd, `${req.params.subjectId}`];
    // console.log(user.markAdd, `${req.params.subjectId}`);
    await user.save();
    const marky = await Mark.find({
      class: req.params.classId,
    }).populate("student");
    // console.log(marky);
    res.status(200).send(user);
  } catch (error) {
    // console.log(error.message);
    res.status(400).send(error.message);
  }
};

exports.updateMark = async (req, res) => {
  try {
    const { totalMark, studentMark, markId } = req.body;
    const mark = await Mark.findOne({ _id: markId });
    console.log(req.body)
    if (!mark) throw new Error("mark not found!");
    if (totalMark*1 < studentMark*1)
      throw new Error("student mark is bigger than total mark!");
    mark.totalMark = totalMark*1;
    mark.studentMark = studentMark*1;
    await mark.save();
    res.status(200).send({ totalMark, studentMark, markId })

  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.backToReview = async (req,res) => {
  console.log({
    student : req.body.studentId,
    subject :req.params.subjectId
  })
  const student = await User.findOne({_id : req.body.studentId})
  const studentMark = await Mark.find({
    student : req.body.studentId,
    subject :req.params.subjectId
  })
  studentMark.map(async(mark) => {
    if(mark.permission==="Head") mark.permission="Teacher"
    if(mark.permission==="Leader") mark.permission="Head"
    await mark.save()
  })
  res.send(`${student.name} has sent to be Reviewed`)
}

//4035
//12345678