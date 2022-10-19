const express = require('express');
const shippingSchema = require('../models/shippings');
const shippingOrdersSchema = require('../models/shipping_orders');
const router = express.Router();

// Create user
router.post('/shipping', (req, res) => {
    const shipping = shippingSchema();
    const shippingOrders = shippingOrdersSchema();
    shippingOrders.created_time = Date.now();
    shipping.status = req.body.status
    shipping
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
/*
{
    status: “pending”, “sent” y “completed”.
}
*/
});

function getWeek(data) {
    let date = data
    let listDate = new Date(date)
    let parseList = listDate.toLocaleDateString("es-PE").split('/')
    const obj = {
      week: parseList[1] * 4,
      year: parseInt(parseList[2]),
    }
    return obj
  }
  
  
function sepByShipingId(order, shipping) {
    let array = [];
    let array2 = [];
    order.forEach(data => {
        let i = 1;
        shipping.forEach(ship => {
            let j = 1
            let fecha = getWeek(data.created_time);
            if (ship.shipping_order_id.equals(data._id)) {
                array.push({
                    "status_shipping": ship.status,
                    "year": fecha.year,
                    "week": fecha.week,
                    "count": j,
                    "total_amount": i,
                })
                j++;
                i++;
            }
        })
        array2.push(array)
        array = []
    });
    array2.forEach(res => {
        if (res.length > 1)
        res[0].count += 1;
        array.push(res[0])
    })
    return array
  }

// Get all users
router.get('/shipping', (req, res) => {
    shippingSchema
    .find()
    .then((shipping) => {
        shippingOrdersSchema
        .find()
        .then((order) => {
            res.json(sepByShipingId(order, shipping))
        })
        .catch((error) => res.json({ message: error }));
    })
});

// Get a users
router.get('/shipping/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Update a users
router.put('/shipping/:id', (req, res) => {
    const { id } = req.params;
    const { name, password, nickname, team, last_conection, pokemones } = req.body;
    userSchema
    .updateOne({ _id: id }, { $set: {name, password, nickname, team, last_conection, pokemones } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// Delete a users
router.delete('/shipping/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
