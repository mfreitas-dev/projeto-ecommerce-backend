import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'cancelled', 'expired'],
        default: 'pending',
    },
    mpPreferenceId: {
        type: String,
    },
    mpPaymentId: {
        type: String,
    },
    }, {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', OrderSchema);

export default Order;