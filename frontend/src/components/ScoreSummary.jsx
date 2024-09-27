/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Typography, Card, CardContent, Button, Box, Grow } from '@mui/material';
import { useLocation } from 'react-router-dom';

const ScoreSummary = () => {
    const location = useLocation();
    const score = location.state?.score || 0; // Get score from state or default to 0

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '50px' }}>
            <Card elevation={3}>
                <CardContent style={{ textAlign: 'center' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Your Score
                    </Typography>
                    <Grow in={score >= 3} timeout={1000}>
                        <Typography
                            variant="h1"
                            component="h2"
                            color="primary"
                            style={{ fontWeight: 'bold', transition: 'transform 0.5s ease' }}
                        >
                            {score}
                        </Typography>
                    </Grow>
                    <Grow in={score < 3} timeout={1000}>
                        <Typography
                            variant="h1"
                            component="h2"
                            color="secondary"
                            style={{ fontWeight: 'bold', transition: 'transform 0.5s ease' }}
                        >
                            {score}
                        </Typography>
                    </Grow>
                    <Typography variant="body1" gutterBottom>
                        Thank you for participating!
                    </Typography>
                    <Box mt={2}>
                        <Button variant="contained" color="primary" href="/">
                            Back to Quiz List
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ScoreSummary;
