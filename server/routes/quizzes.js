const express = require("express");
const router = express.Router();
const quizCtrl = require("../controllers/quizController");
const adminAuth = require("../middleware/adminAuth");

// Admin create (protected)
router.post("/admin/quizzes", adminAuth, quizCtrl.createQuiz);

router.get("/admin/quizzes/:id", adminAuth, quizCtrl.getQuizAdmin);
router.put("/admin/quizzes/:id", adminAuth, quizCtrl.updateQuiz);

// Public routes
router.get("/quizzes", quizCtrl.listQuizzes);
router.get("/quizzes/:id", quizCtrl.getQuiz);
router.post("/quizzes/:id/submit", quizCtrl.submitQuiz);

// Admin delete (protected)
router.delete("/admin/quizzes/:id", adminAuth, quizCtrl.deleteQuiz);

module.exports = router;
