export async function handleMercadoPagoWebhook(req, res) {
  console.log('Webhook recebido:', req.body);

  return res.status(200).send('OK');
}