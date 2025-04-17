import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library";
import UserRoutes from "./routes/User.js";
import User from "./models/User.js"; // Ensure you have a User model

dotenv.config();

const app = express();

// Initialize Google OAuth2 Client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173", // Only allow requests from the frontend
  methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // For sending cookies
}));

// Google OAuth - Auth route
app.post('/api/auth/google', async (req, res) => {
  try {
    const token = req.body.token; // Google token sent from frontend
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID, // Verify against your client ID
    });

    const payload = ticket.getPayload();
    
    // Check if the user already exists in the database
    const user = await User.findOne({ googleId: payload.sub });

    if (!user) {
      // If user doesn't exist, create a new one
      const newUser = new User({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
      });
      await newUser.save();

      // Generate JWT Token
      const jwtToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(201).json({ token: jwtToken, user: newUser });
    } else {
      // If user exists, generate JWT token
      const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token: jwtToken, user });
    }
  } catch (err) {
    console.error('Error verifying Google token:', err);
    res.status(500).json({ error: 'Google OAuth verification failed' });
  }
});

// Other routes
app.use("/api/user/", UserRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({ success: false, status, message });
});

// Root route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello developers from lorobek" });
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to Mongo DB");
  } catch (err) {
    console.error("Failed to connect with Mongo");
    console.error(err);
  }
};

// Start server
const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
