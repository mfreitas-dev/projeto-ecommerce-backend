import Order from "../models/Order.js";
import Product from "../models/Product.js";

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

        return res.status(201).json(order)        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: error.message });
    }
};