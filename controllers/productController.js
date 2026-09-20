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

export async function CreateProduct(req,res) {
    try {
        const nome = req.body.name;
        const jaExiste = await Product.findOne({name: nome});
        if(jaExiste){
            return res.status(409).json({erro: "Produto ja existe!"})
        }
        const novoProduto = await Product.create(req.body);
        return res.status(201).json(novoProduto);
    } catch (error) {
        console.error(error);
        return res.status(500).json({erro: error})        
    }
};

export async function updateProduct(req,res){
    try {
        const id = req.params.id;
        const jaExiste = await Product.findById(id);
        if(!jaExiste){
            return res.status(404).json({erro: "Produto nao encontrado"})
        };
        const produtoAtualizado = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        return res.status(200).json(produtoAtualizado)
    } catch(error) {
        console.error(error);
        return res.status(500).json({erro: error})
    };
};

export async function deleteProduct(req,res){
    try {
        const id = req.params.id;
        const produtoDeletado = await Product.findByIdAndDelete(id);

        if (!produtoDeletado) {
        return res.status(404).json({ message: 'Produto não encontrado' });
        }

        return res.status(200).json({
            message: 'Produto deletado com sucesso!'
        });
    } catch(error) {
        console.error(error);
        return res.status(500).json({erro: error})
    };
};