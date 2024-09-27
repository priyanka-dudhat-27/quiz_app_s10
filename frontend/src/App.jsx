/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import QuizList from './components/QuizList';
import QuizPage from './components/QuizPage';
import ScoreSummary from './components/ScoreSummary';
import { useState } from 'react';

const App = () => {
    const [score, setScore] = useState(null);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<QuizList />} />
                <Route path="/quiz/:id" element={<QuizPage />} />
                <Route path="/score-summary" element={<ScoreSummary />} />
                <Route path="*" element={<h2>404 Not Found</h2>} />

            </Routes>
        </Router>
    );
};

export default App;
