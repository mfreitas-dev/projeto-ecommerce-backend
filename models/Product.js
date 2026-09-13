import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    stock: {
        type: Number,
        default: 0,
        min: 0,
    }, 
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;