import { Payment } from 'mercadopago';
import client from '../config/mercadoPago.js';
import Order from '../models/Order.js';

export async function handleMercadoPagoWebhook(req, res) {
  console.log('Webhook recebido:', req.body);

  const paymentId = req.body.data?.id;

  if (!paymentId) {
    return res.status(200).send('OK');
  }

  try {
    const payment = new Payment(client);
    const paymentInfo = await payment.get({ id: paymentId });
    console.log(paymentInfo);

    const status = paymentInfo.status;
    const orderId = paymentInfo.external_reference;

    const order = await Order.findById(orderId);

    if (!order) {
      console.log('Order não encontrado para o external_reference:', orderId);
      return res.status(200).send('OK');
    }

    if (status === 'approved') {
      order.status = 'paid';
    } else if (status === 'rejected' || status === 'cancelled') {
      order.status = 'cancelled';
    }

    await order.save();

    return res.status(200).send('OK');
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    return res.status(200).send('OK');
  }
};