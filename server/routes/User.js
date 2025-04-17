import express from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library"; // Google OAuth client
import {
  UserLogin,
  UserRegister,
  addWorkout,
  getUserDashboard,
  getWorkoutsByDate,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Initialize Google OAuth2 Client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

// Обычная регистрация/вход
router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

// Google OAuth (manual flow, no passport)
router.post('/auth/google', async (req, res) => {
  try {
    const token = req.body.token;
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Make sure this matches your Google client ID
    });

    const payload = ticket.getPayload();
    console.log('Google OAuth payload:', payload); // For debugging purposes

    // Check if the user already exists
    const user = await User.findOne({ googleId: payload.sub });

    if (!user) {
      // Create a new user
      const newUser = new User({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
      });
      await newUser.save();

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(201).json({ token, user: newUser });
    } else {
      // If the user exists, return the existing user and JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(200).json({ token, user });
    }
  } catch (err) {
    console.error('Error verifying Google token:', err.message); // Log error for debugging
    return res.status(500).json({ error: 'Google OAuth verification failed', details: err.message });
  }
});


// Дашборд и тренировки (защищенные маршруты)
router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);

export default router;
