import express from 'express';
import { handleMercadoPagoWebhook } from '../controllers/webhookController.js';

const webhookRouter = express.Router();

webhookRouter.post('/mercadopago', handleMercadoPagoWebhook);

export default webhookRouter;