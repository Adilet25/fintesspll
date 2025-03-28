import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library"; // Google OAuth client
import passport from "./middleware/Passport.js"; // Passport middleware
import UserRoutes from "./routes/User.js";
import User from "./models/User.js"; // Ensure you have a User model for database interactions

dotenv.config();

const app = express();

// Initialize Google OAuth2 Client
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

// Middleware setup
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
app.use(
  cors({
    origin: "https://fitnesspll.netlify.app", // Allow only this origin
    methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // If you're using cookies/authentication
  })
);
// Google OAuth - Auth route to exchange code for tokens
app.post('/auth/google', async (req, res) => {
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
      // If the user doesn't exist, create a new one
      const newUser = new User({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
      });
      await newUser.save();
      res.status(201).json(newUser); // Respond with the new user
    } else {
      res.status(200).json(user); // If the user exists, return the user data
    }
  } catch (err) {
    console.error('Error verifying Google token:', err);
    res.status(500).json({ error: 'Google OAuth verification failed' });
  }
});

// Other routes (e.g., for user-related actions)
app.use("/api/user/", UserRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Root route
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from lorobek",
  });
});

// Database connection
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.log("MongoDB URL:", process.env.MONGODB_URL);
      console.error(err);
    });
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
