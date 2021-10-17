const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: Number,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: [true, "Please Enter Your Email !"],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password Must Be More Than 8 Chars !"],
    },
    markAdd: [
      {
        type: String,
      },
    ],
    type: {
      type: String,
      enum: ["Student", "Teacher", "Head", "Leader", "Admin"],
      default: "Student",
    },
    subject: {
      type: String,
      required: true,
    },
    class: [
      {
        type: String,
        required: true,
      },
    ],
    img: {
      type: String,
      default: "static/img/default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});
userSchema.virtual("marks", {
  ref: "Mark",
  localField: "_id",
  foreignField: "student",
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.plugin(AutoIncrement, { inc_field: "user", start_seq: 4000 });

const User = mongoose.model("User", userSchema);
module.exports = User;
