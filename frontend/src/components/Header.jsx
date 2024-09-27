/* eslint-disable no-unused-vars */
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice'; // Adjust the import path as necessary

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // Get the user info from Redux state

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Quiz Application
                </Typography>

                {/* Conditionally render Create Quiz button for admin */}
                {user && user.role === 'admin' && (
                    <Button
                        component={Link}
                        to="/create-quiz" // Add your create quiz path here
                        color="inherit"
                        sx={{ marginRight: 2 }}
                    >
                        Create Quiz
                    </Button>
                )}

                {/* Logout button */}
                {user ? (
                    <>
                        <Button 
                            onClick={handleLogout}
                            color="inherit"
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Button 
                            component={Link} 
                            to="/" 
                            color="inherit"
                            sx={{ marginRight: 2 }}
                        >
                            Login
                        </Button>
                        <Button 
                            component={Link} 
                            to="/register" 
                            color="inherit"
                        >
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
