import express from 'express';
import { register, login } from '../controllers/authController.js';
import { check } from 'express-validator';

const router = express.Router();

// Register Route
router.post('/register', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
], register);

// Login Route
router.post('/login', [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').exists()
], login);

export default router;
