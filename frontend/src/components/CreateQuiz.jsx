/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const CreateQuiz = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctAnswer: '' }]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const quizData = { title, description, questions };
        try {
            await axios.post('/api/quizzes', quizData); // Adjust API endpoint as necessary
            // Reset form or navigate to another page
        } catch (error) {
            console.error("Error creating quiz", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Create Quiz</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Quiz Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {/* Map through questions for input */}
                {questions.map((question, index) => (
                    <div key={index}>
                        <TextField
                            label={`Question ${index + 1}`}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={question.questionText}
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[index].questionText = e.target.value;
                                setQuestions(updatedQuestions);
                            }}
                        />
                        {/* Options */}
                        {question.options.map((option, optionIndex) => (
                            <TextField
                                key={optionIndex}
                                label={`Option ${optionIndex + 1}`}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={option}
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[index].options[optionIndex] = e.target.value;
                                    setQuestions(updatedQuestions);
                                }}
                            />
                        ))}
                        <TextField
                            label="Correct Answer"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={question.correctAnswer}
                            onChange={(e) => {
                                const updatedQuestions = [...questions];
                                updatedQuestions[index].correctAnswer = e.target.value;
                                setQuestions(updatedQuestions);
                            }}
                        />
                    </div>
                ))}
                <Button type="submit" variant="contained" color="primary">
                    Create Quiz
                </Button>
            </form>
        </Container>
    );
};

export default CreateQuiz;
