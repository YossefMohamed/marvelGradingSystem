const User = require("./models/user");
const path = require("path");

const mongoose = require("mongoose");
const Class = require("./models/class");
const Subject = require("./models/subject");
require("dotenv").config({ path: path.join(__dirname, "./.env") });

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((e) => console.log("connected"))
    .catch((e) => console.log(e.message));
};
connectDB();
const subjects = [
  {
    name: "English",
    class: "Year 1-A",
  },
  {
    name: "Math",
    class: "Year 1-A",
  },
];
const users = [
  {
    name: "Amal",
    email: "ama22s@gmail.com",
    password: "12345678",
    type: "Student",
    subject: "English",
    class: "Year 1-A",
  },
  {
    name: "Body",
    email: "boa233s@gmail.com",
    password: "12345678",
    class: "Year 1-A",
    subject: "English",
    type: "Student",
  },
  {
    name: "yossef",
    email: "yosaf233s@gmail.com",
    password: "12345678",
    type: "Student",
    subject: "English",
    class: "Year 1-A",
  },
  {
    name: "Hassan",
    email: "hasa233s@gmail.com",
    password: "12345678",
    class: "Year 1-A",
    subject: "English",
    type: "Student",
  },
];

// subjects.map(async (subject) => {
//   const created = await Subject.create(subject)
// })

try {
  users.map(async (user, idx) => {
    const createdOne = await User.create(user);
    console.log(createdOne);
  });
} catch (error) {
  console.log(error.message);
}
