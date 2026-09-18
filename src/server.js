import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from '../config/db.js';
import productRouter from '../routes/product.routes.js';
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/products", productRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK! API funcionando!' });
});

app.listen(PORT, () => {
  console.log(`=== AVISO 01: Servidor rodando em http://localhost:${PORT} ===`);
});