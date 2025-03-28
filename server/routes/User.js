import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import {
  UserLogin,
  UserRegister,
  addWorkout,
  getUserDashboard,
  getWorkoutsByDate,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Обычная регистрация/вход
router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  // You don't need to use the token from the body since Passport handles the authentication
  const token = jwt.sign({ id: req.user.id, email: req.user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token, user: req.user });
});
// Дашборд и тренировки (защищенные маршруты)
router.get("/dashboard", verifyToken, getUserDashboard);
router.get("/workout", verifyToken, getWorkoutsByDate);
router.post("/workout", verifyToken, addWorkout);

export default router;
