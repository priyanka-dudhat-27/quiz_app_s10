/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';  // Import prop-types
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Assuming you use Redux for state management

const PrivateRoute = ({ roles, children }) => {
    const { user } = useSelector((state) => state.auth); // Get the user info from Redux state

    // Check if user is logged in and if their role matches the required roles
    if (!user || !roles.includes(user.role)) {
        return <Navigate to="/" />; // Redirect to login if not authorized
    }

    return children;
};

// PropTypes validation
PrivateRoute.propTypes = {
    roles: PropTypes.arrayOf(PropTypes.string).isRequired, // roles should be an array of strings
    children: PropTypes.element.isRequired,  // children should be a React element
};

export default PrivateRoute;
