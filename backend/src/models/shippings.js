const mongoose = require('mongoose');

const shippingSchema = mongoose.Schema({
    shipping_order_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Shipping', shippingSchema);
