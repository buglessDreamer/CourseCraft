const { Router } = require("express");
const courseRouter = Router();
const { courseModel, purchaseModel } = require("../database/schema");
const {authMiddleware} = require("../middleware/auth");

courseRouter.get("/", async (req, res) => {
  try {
    const courses = await courseModel.find({})
      .populate('creatorId', 'username');

    res.json({
      msg: "Fetched all courses successfully",
      courses,
    });
  } catch (e) {
    res.status(500).json({
      msg: "Error fetching courses",
      error: e.message
    });
  }
});

courseRouter.post("/purchase/:courseId", authMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const userId = req.userId;

  try {
    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const existingPurchase = await purchaseModel.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (existingPurchase) {
      return res.status(400).json({ msg: "You already own this course" });
    }

    await purchaseModel.create({
      courseId: courseId,
      userId: userId,
    });

    res.json({
      msg: "You have successfully purchased the course",
      courseId: course._id,
    });
  } catch (e) {
    res.status(500).json({ msg: "Purchase failed" });
  }
});

module.exports = courseRouter;
