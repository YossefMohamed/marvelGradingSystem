const { getClass,addClass } = require("../../controllers/classController");
const { protect } = require("../../utils/protect");
const subjectRouter = require("./subject")

const router = require('express').Router({mergeParams: true});


router.get("/:classId" ,protect , getClass)
router.post("/add" , protect,addClass)
router.use("/:classId" , protect,subjectRouter)

module.exports = router;
