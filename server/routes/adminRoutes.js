const { Router } = require("express");
const dotenv = require("dotenv");
dotenv.config();
const adminRouter = Router();
const { adminModel, courseModel } = require("../database/schema");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { adminMiddleware } = require("../middleware/auth");

adminRouter.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    await adminModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json({ msg: "Admin signed up successfully" });
  } catch (e) {
    res.status(500).json({ msg: "Signup failed" });
  }
});

adminRouter.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const admin = await adminModel.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    const token = jwt.sign({ id: admin._id }, process.env.JWT_ADMIN_PASSWORD);
    res.json({ token, msg: "Signin successful" });
  } else {
    res.status(403).json({ msg: "Invalid credentials" });
  }
});

adminRouter.post("/courses", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, price, imageUrl } = req.body;

  try {
    const course = await courseModel.create({
      title,
      description,
      price,
      imageUrl,
      creatorId: adminId,
    });

    res.json({
      msg: "Course created successfully",
      courseId: course._id,
    });
  } catch (e) {
    res.status(500).json({ msg: "Error creating course" });
  }
});

adminRouter.put("/courses/:courseId", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const courseId = req.params.courseId;
  const { title, description, price, imageUrl } = req.body;

  try {
    const course = await courseModel.updateOne(
      {
        _id: courseId,
        creatorId: adminId,
      },
      {
        title,
        description,
        price,
        imageUrl,
      }
    );

    res.json({ msg: "Course updated successfully" });
  } catch (e) {
    res.status(500).json({ msg: "Update failed" });
  }
});

adminRouter.get("/courses", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const courses = await courseModel.find({ creatorId: adminId });

  res.json({
    msg: "Your courses fetched successfully",
    courses,
  });
});

adminRouter.delete("/courses/:id", adminMiddleware, async (req, res) => {
  const courseId = req.params.id;
  const adminId = req.userId; 

  try {
    // Use courseModel (not Course) to match your import
    const result = await courseModel.deleteOne({
      _id: courseId,
      creatorId: adminId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Course not found or unauthorized" });
    }

    res.json({ msg: "Course deleted successfully" });
  } catch (e) {
    res.status(500).json({ msg: "Delete failed", error: e.message });
  }
});

adminRouter.post("/courses/:courseId/content", adminMiddleware, async (req, res) => {
  const { courseId } = req.params;
  const { title, videoUrl, description, type } = req.body;
  const adminId = req.userId;

  try {
    const course = await courseModel.findOneAndUpdate(
      { _id: courseId, creatorId: adminId },
      { 
        $push: { 
          content: { title, videoUrl, description, type } 
        } 
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ msg: "Course not found or unauthorized" });
    }

    res.json({
      msg: "Content added successfully",
      content: course.content
    });
  } catch (e) {
    res.status(500).json({ msg: "Failed to add content", error: e.message });
  }
});

module.exports = adminRouter;