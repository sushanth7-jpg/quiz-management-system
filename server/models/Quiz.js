const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true },
});

const QuestionSchema = new mongoose.Schema({
  type: { type: String, enum: ["mcq", "tf", "text"], required: true },
  text: { type: String, required: true },
  options: { type: [OptionSchema], default: undefined },
  correctIndex: { type: Number },
  correctBoolean: { type: Boolean },
  correctText: { type: String },
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: { type: [QuestionSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", QuizSchema);
