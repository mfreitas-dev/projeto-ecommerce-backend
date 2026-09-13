import Product from "../models/Product.js";

export async function getAllProducts(req,res){
    try {
        const produtos = await Product.find({});
        return res.status(200).json(produtos)
    } catch(error) {
        console.error(error);
        return res.status(500).json({erro: error})
    };
};

export async function getProductsByID(req,res){
    try {
        const id = req.params.id;
        const produto = await Product.findById(id);
        if(!produto){
            return res.status(404).json({erro: "Produto nao encontrado"})
        }
        return res.status(200).json(produto)
    } catch(error) {
        console.error(error);
        return res.status(500).json({erro: error})
    };
};