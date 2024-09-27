import express from 'express';
import { getQuizzes, getQuizById, submitQuiz } from '../controllers/quizController.js';
const router = express.Router();

router.get('/quizzes', getQuizzes);
router.get('/quizzes/:id', getQuizById);
router.post('/quizzes/submit', submitQuiz);

export default router;
