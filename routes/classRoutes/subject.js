const {
  getSubject,
  addSubject,
  addMark,
  updateMark,
  backToReview,
} = require("../../controllers/subjectController");
const { protect } = require("../../utils/protect");

const router = require("express").Router({ mergeParams: true });

router.get("/:subjectId", getSubject);
router.post("/:subjectId/:studentId", protect, addMark);
router.post("/", protect, addSubject);
router.post("/mark/:subjectId/add", protect, updateMark);
router.patch("/mark/:subjectId/review", protect, backToReview);

module.exports = router;
