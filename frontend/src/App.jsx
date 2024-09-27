/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './components/Login';
import AdminPanel from './components/Adminpanel';
import QuizList from './components/QuizList';
import QuizPage from './components/QuizPage';
import ScoreSummary from './components/ScoreSummary';
import CreateQuiz from './components/CreateQuiz'; // Import the CreateQuiz component
import PrivateRoute from './components/PrivateRoutes'; // Ensure to import the correct PrivateRoute
import { useState } from 'react';
import Register from './components/Register';

const App = () => {
    const [score, setScore] = useState(null); // State for score (if needed)

    return (
        <Router>
            <Header />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/quiz-list" element={<QuizList />} />
                <Route path="/quiz/:id" element={<QuizPage />} />
                <Route path="/score-summary" element={<ScoreSummary />} />

                {/* Admin Protected Routes */}
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute roles={['admin']}>
                            <AdminPanel />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/create-quiz"
                    element={
                        <PrivateRoute roles={['admin']}>
                            <CreateQuiz />
                        </PrivateRoute>
                    }
                />

                {/* 404 Route */}
                <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
        </Router>
    );
};

export default App;
