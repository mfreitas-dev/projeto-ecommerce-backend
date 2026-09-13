import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK! API funcionando!' });
});

app.listen(PORT, () => {
  console.log(`--Servidor rodando em http://localhost:${PORT}`);
});