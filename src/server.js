import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from '../config/db.js';
import productRouter from '../routes/product.routes.js';
import authRouter from '../routes/auth.routes.js';
import orderRouter from '../routes/order.routes.js';
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/products", productRouter);
app.use('/auth', authRouter);
app.use('/orders', orderRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK! API funcionando!' });
});

app.listen(PORT, () => {
  console.log(`=== AVISO 01: Servidor rodando em http://localhost:${PORT} ===`);
});