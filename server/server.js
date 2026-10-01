const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
const courseRouter = require("./routes/courseRoutes");

app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "token"], 
  })
);

app.use(express.json());

app.use("/admin", adminRouter);
app.use("/users", userRouter);
app.use("/courses", courseRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});