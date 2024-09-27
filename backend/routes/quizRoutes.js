import express from 'express';
import { getQuizzes, getQuizById, submitQuiz ,createQuiz} from '../controllers/quizController.js';
const router = express.Router();

router.post('/add-quiz', createQuiz);
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:id', getQuizById);
router.post('/quizzes/submit', submitQuiz);

export default router;
