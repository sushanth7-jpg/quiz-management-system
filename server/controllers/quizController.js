const Quiz = require("../models/Quiz");
const { validateQuizPayload } = require("../validations/quizValidation");

async function createQuiz(req, res) {
  const payload = req.body;
  const check = validateQuizPayload(payload);
  if (!check.valid) return res.status(400).json({ message: check.message });

  const quiz = new Quiz({
    title: payload.title,
    questions: payload.questions,
  });
  await quiz.save();
  res.status(201).json(quiz);
}

async function listQuizzes(req, res) {
  const quizzes = await Quiz.find()
    .select("title createdAt")
    .sort({ createdAt: -1 });
  res.json(quizzes);
}

async function getQuiz(req, res) {
  const { id } = req.params;
  const quiz = await Quiz.findById(id).lean();
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  // Remove answer fields for public delivery
  const publicQuiz = JSON.parse(JSON.stringify(quiz));
  publicQuiz.questions = publicQuiz.questions.map((q) => {
    const copy = { ...q };
    delete copy.correctIndex;
    delete copy.correctBoolean;
    delete copy.correctText;
    return copy;
  });

  res.json(publicQuiz);
}

function scoreSubmission(quiz, answers) {
  let score = 0;
  const detailed = [];

  quiz.questions.forEach((q, idx) => {
    const given = answers?.[idx];
    let correct = false;

    if (q.type === "mcq") {
      correct = typeof given === "number" && given === q.correctIndex;
    } else if (q.type === "tf") {
      correct = typeof given === "boolean" && given === q.correctBoolean;
    } else if (q.type === "text") {
      if (!given) correct = false;
      else
        correct =
          String(given).trim().toLowerCase() ===
          String(q.correctText || "")
            .trim()
            .toLowerCase();
    }

    if (correct) score += 1;

    let correctAnswer = null;
    if (q.type === "mcq")
      correctAnswer = q.options?.[q.correctIndex]?.text ?? null;
    if (q.type === "tf") correctAnswer = q.correctBoolean;
    if (q.type === "text") correctAnswer = q.correctText ?? null;

    detailed.push({ index: idx, correct, correctAnswer, given });
  });

  return { score, total: quiz.questions.length, detailed };
}

async function submitQuiz(req, res) {
  const { id } = req.params;
  const { answers } = req.body;
  const quiz = await Quiz.findById(id).lean();
  if (!quiz) return res.status(404).json({ message: "Quiz not found" });

  const result = scoreSubmission(quiz, answers);
  res.json(result);
}

module.exports = { createQuiz, listQuizzes, getQuiz, submitQuiz };
