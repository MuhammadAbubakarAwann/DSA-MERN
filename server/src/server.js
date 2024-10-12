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

app.use('/api/premium/webhook', express.raw({ type: 'application/json' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://abubakar:033089@dsa-db.lj96x.mongodb.net/?retryWrites=true&w=majority&appName=DSA-DB", {
  dbName: "DSA-DB",
}).then(() => {

  console.log("Database connected");

  app.use('/api/auth', authRouter);
  app.use('/api/premium', premiumRouter);

  app.listen(PORT, () => {
    console.log(`App running at port: ${PORT}`);
  });
  
}).catch((err) => {
  console.error("Database connection error:", err);
});
