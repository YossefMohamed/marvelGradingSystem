const Class = require("../models/class");
const signIn = require("../utils/signinJWT");
const User = require("./../models/user");

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    const login = await jwt.verify(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(login.id);
    if (freshUser) res.redirect("/dashboard");
  }
  const user = await User.findOne({ user: req.body.user });
  if (!user || !(await user.matchPassword(req.body.password)))
    res.status(200).render("index.ejs", {
      error: "Email or Password are wrong !",
    });
    const userId = signIn(user.id)
    res.cookie("token" , userId)
    res.redirect("/dashboard")
};


exports.dashboard = async (req,res) => {
  let classes;
  if(req.user.type==="Teacher")
  {
     classes = await Class.find({
     name : {$in : req.user.class}
  });
  }else{
     classes = await Class.find({
  });
  }
  res.status(200).render("classPage.ejs",
  {user : req.user,
  classes
}
  );
}

exports.logout = (req,res) => {
  res.cookie("token" , "")
  res.redirect("/")
}