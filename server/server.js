const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const courseRouter = require("./routes/courseRoutes");

const allowedOrigins = [
  "https://course-craft-seven-gray.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "token"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // explicitly answer preflight requests

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use("/courses", courseRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});