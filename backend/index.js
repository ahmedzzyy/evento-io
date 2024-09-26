import express from 'express';
import { connect } from 'mongoose';
import dotenv from 'dotenv';
import authroutes from './routes/auth.js';
import eventRoutes from "./routes/events.js";
import registrationRoutes from "./routes/registrations.js";
import usersRoutes from "./routes/users.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// MongoDB Connection
const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// Call the connectDB function to connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authroutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
