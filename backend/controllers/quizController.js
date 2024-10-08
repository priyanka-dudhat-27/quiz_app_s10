import Quiz from '../models/quiz.js';

export const createQuiz=async (req, res) => {
    try {
      const newQuiz = new Quiz(req.body); // Expecting the quiz data to be in the request body
      await newQuiz.save(); // Save the quiz in the database
      res.status(201).json({ message: 'Quiz added successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add quiz', error: error.message });
    }
  }

// Fetch all quizzes
export const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch quiz by ID
export const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Submit quiz answers
export const submitQuiz = async (req, res) => {
    const { answers 

    } = req.body;
    let score = 0;

    try {
        const quiz = await Quiz.findById(req.body.quizId);
        quiz.questions.forEach((question, index) => {
            if (question.answer === answers[index]) score++;
        });
        res.json({ score });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
