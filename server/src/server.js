import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './router/authRouter.js';
import premiumRouter from './router/premiumRouter.js';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());

// Apply the raw body middleware only for the webhook route first
app.use('/api/premium/webhook', express.raw({ type: 'application/json' }));

// Now apply the global body parser middleware for other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mongoose connection
mongoose.connect("mongodb+srv://abubakar:033089@dsa-db.lj96x.mongodb.net/?retryWrites=true&w=majority&appName=DSA-DB", {
  dbName: "DSA-DB",
}).then(() => {
  console.log("Database connected");

  // Auth routes using express.json()
  app.use('/api/auth', authRouter);

  // Premium routes using express.json()
  app.use('/api/premium', premiumRouter);

  app.listen(PORT, () => {
    console.log(`App running at port: ${PORT}`);
  });
}).catch((err) => {
  console.error("Database connection error:", err);
});
