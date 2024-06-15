const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: String,
    brand: String,
    qty: Number,
    price: Number
});

module.exports = mongoose.model('Inventory', inventorySchema);
