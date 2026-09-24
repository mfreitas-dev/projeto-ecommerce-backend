import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { Preference } from 'mercadopago';
import client from '../config/mercadoPago.js';

export async function createOrder(req,res) {
    try {
        const itens = req.body.items;
        const orderItens = [];

        for (let index = 0; index < itens.length; index++) {
            const element = itens[index];

            const produto = await Product.findById(element.productId);
            if(!produto){
                return res.status(404).json({erro: "Produto nao encontrado."})
            };
            if(element.quantity > produto.stock){
                return res.status(422).json({erro: 'Quantidade desejada é maior que a disponível em estoque.'})
            };

            orderItens.push({
                productId: produto._id,
                name: produto.name,
                price: produto.price,
                quantity: element.quantity,
            });        
        };

        const totalAmount = orderItens.reduce((acumulador, item) => {
            return acumulador + (item.price * item.quantity)
        }, 0);

        const order = await Order.create({
            items: orderItens,
            totalAmount: totalAmount,
            status: 'pending',
        });

        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: order.items.map(item => ({
                id: item.productId.toString(),
                title: item.name,
                unit_price: item.price,
                quantity: item.quantity,
                currency_id: 'BRL',
            })),
            external_reference: order._id.toString(),
            back_urls: {
                success: 'http://localhost:3000/checkout/sucesso',
                failure: 'http://localhost:3000/checkout/falha',
                pending: 'http://localhost:3000/checkout/pendente',
            },
            auto_return: 'approved',
            },
        });

        order.mpPreferenceId = result.id;
        await order.save();

        return res.status(201).json({
            order,
            init_point: result.init_point,
        })      
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: error.message });
    }
};