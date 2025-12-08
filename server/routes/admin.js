const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/adminController");
const quizCtrl = require("../controllers/quizController");
const adminAuth = require("../middleware/adminAuth");

// POST /api/admin/login
router.post("/admin/login", adminCtrl.adminLogin);

// POST /api/admin/quizzes (Protected)
router.post("/admin/quizzes", adminAuth, quizCtrl.createQuiz);

// GET /api/admin/quizzes (Optional list of all quizzes for admin)
router.get("/admin/quizzes", adminAuth, quizCtrl.listQuizzes);

module.exports = router;
