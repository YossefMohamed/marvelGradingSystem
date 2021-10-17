const express = require("express");
const { login, dashboard, logout } = require("../controllers/userController");
const { protect } = require("../utils/protect");
const router = express.Router();

// /api/users

router.post("/login", login);
router.get("/dashboard" ,protect, dashboard)
router.get("/logout" , protect , logout)
module.exports = router;
