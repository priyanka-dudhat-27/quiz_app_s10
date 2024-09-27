/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Button, Grid, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        axios.get(`${BASE_URL}/quizzes`)
            .then((response) => {
                setQuizzes(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.response?.data?.message || 'Error fetching quizzes');
                setLoading(false);
            });
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container maxWidth="lg" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Available Quizzes
            </Typography>
            <Grid container spacing={4} justifyContent="center">
                {quizzes.map((quiz) => (
                    <Grid item xs={12} sm={6} md={4} key={quiz._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{quiz.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {quiz.description}
                                </Typography>
                                <Button
                                    component={Link}
                                    to={`/quiz/${quiz._id}`}
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: '16px' }}
                                >
                                    Take Quiz
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default QuizList;
