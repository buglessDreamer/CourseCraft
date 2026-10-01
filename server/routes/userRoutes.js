const { Router } = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { object, string } = require("zod");
const { userModel, purchaseModel } = require("../database/schema");
const {authMiddleware} = require("../middleware/auth");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const requiredBody = z.object({
    username: z.string().min(5).max(30),
    email: z.string().min(7).max(100).email(),
    password: z.string().min(6).max(15),
  });
  const parsedWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedWithSuccess.success) {
    return res.status(400).json({
      msg: parsedWithSuccess.error,
    });
  }
  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const hashed_password = await bcrypt.hash(password, 5);

    await userModel.create({
      username: username,
      email: email,
      password: hashed_password,
    });

    return res.json({
      msg: `You have signed up successfully`,
    });
  } catch (error) {
    return (
      res.status(500).json({
        msg: `Failed to sign you up`,
      })
    );
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return res.status(403).json({ msg: "Incorrect credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(403).json({ msg: "Incorrect credentials" });
    }
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      process.env.JWT_SECRET
    );

    res.json({
      token: token,
      msg: "Signed in successfully",
    });
  } catch (e) {
    res.status(500).json({ msg: "Error during signin" });
  }
});

userRouter.get("/purchasedCourses", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const purchases = await purchaseModel
      .find({
        userId: userId,
      })
      .populate("courseId");

    res.json({
      msg: "Purchased courses fetched successfully",
      purchases: purchases,
    });
  } catch (e) {
    res.status(500).json({
      msg: "Error while fetching purchased courses",
    });
  }
});

module.exports = userRouter;
