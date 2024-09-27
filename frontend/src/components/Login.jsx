/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/authSlice'; // Example of action to handle login
import { keyframes } from '@emotion/react';
import axios from 'axios'

// Define a fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_URL

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            dispatch(login(response.data.user)); // Ensure response.data.user contains role
            navigate('/quiz-list'); // Navigate to home page after login
        } catch (error) {
            // Handle login error
            console.error(error);
        }
    };
    

    return (
        <Container maxWidth="xs" sx={{ animation: `${fadeIn} 0.5s ease-in-out` }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Login
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                    Don`t have an account? <a href="/register">Register here</a>
                </Typography>
            </Box>
        </Container>
    );
};

export default LoginPage;
