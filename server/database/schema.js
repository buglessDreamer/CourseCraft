const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGOURL);

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, unique: true, trim: true, required: true },
  password: { type: String, required: true },
});

const adminSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, unique: true, trim: true, required: true },
  password: { type: String, required: true },
});

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  imageUrl: { type: String, default: "" },
  creatorId: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  content: [{
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String }, 
    type: { type: String, enum: ['video', 'pdf', 'text'], default: 'video' }
  }]
});

const purchaseSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const userModel = mongoose.model("User", userSchema);
const adminModel = mongoose.model("Admin", adminSchema);
const courseModel = mongoose.model("Course", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
