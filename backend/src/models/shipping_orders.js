const mongoose = require('mongoose');

const shippingOrdersSchema = mongoose.Schema({
    total_amount: {
        type: Number,
        required: true
    },
    created_time: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Orders', shippingOrdersSchema);
