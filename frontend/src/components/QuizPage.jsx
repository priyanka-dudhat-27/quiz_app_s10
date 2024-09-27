/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
    Container, 
    Typography, 
    Button, 
    CircularProgress, 
    Radio, 
    RadioGroup, 
    FormControlLabel, 
    FormControl, 
    FormLabel, 
    Box, 
    Fade 
} from '@mui/material';

const QuizPage = () => {
    const { id } = useParams(); // Get quiz ID from URL params
    const navigate = useNavigate(); // Initialize useNavigate
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${BASE_URL}/quizzes/${id}`)
            .then((response) => {
                setQuiz(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.response?.data?.message || 'Error fetching quiz');
                setLoading(false);
            });
    }, [id]);

    const handleAnswerChange = (questionIndex, answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answer
        });
    };

    const handleSubmit = () => {
        let score = 0;

        // Calculate score based on selected answers
        quiz.questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                score += 1; // Increment score for each correct answer
            }
        });

        // Navigate to ScoreSummary page with score
        navigate(`/score-summary`, { state: { score } });
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom align="center" style={{ marginTop: '20px' }}>
                {quiz.title}
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
                {quiz.description}
            </Typography>

            {quiz.questions.map((question, index) => (
                <Fade in={true} timeout={500} key={index}>
                    <Box sx={{ margin: '20px 0', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
                        <FormControl component="fieldset" margin="normal">
                            <FormLabel component="legend" sx={{ fontWeight: 'bold' }}>{question.questionText}</FormLabel>
                            <RadioGroup
                                value={selectedAnswers[index] || ''}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                            >
                                {question.options.map((option, optionIndex) => (
                                    <FormControlLabel
                                        key={optionIndex}
                                        value={option}
                                        control={<Radio />}
                                        label={option}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Fade>
            ))}

            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}
                style={{ marginTop: '20px' }}
            >
                Submit Quiz
            </Button>
        </Container>
    );
};

export default QuizPage;
