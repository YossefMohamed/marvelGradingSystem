const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.protect = async (req, res, next) => {
    let token;
    
    token = req.cookies.token
    
    if (!token) {
        res.redirect("/")
    }
  
    // 2- validate token
    const login = await jwt.verify(token, process.env.JWT_SECRET);
  
    const freshUser = await User.findById(login.id);
    if (!freshUser) {
        res.redirect("/")
    }
  
    req.user = freshUser;
    next();
}