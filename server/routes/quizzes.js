const express = require("express");
const router = express.Router();
const quizCtrl = require("../controllers/quizController");
const adminAuth = require("../middleware/adminAuth");

// Admin create (protected)
router.post("/admin/quizzes", adminAuth, quizCtrl.createQuiz);

// Public routes
router.get("/quizzes", quizCtrl.listQuizzes);
router.get("/quizzes/:id", quizCtrl.getQuiz);
router.post("/quizzes/:id/submit", quizCtrl.submitQuiz);

module.exports = router;
