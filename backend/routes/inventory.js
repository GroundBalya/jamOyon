const express = require('express');
const router = express.Router();
const Inventory = require('../model/Inventory');

// Get all inventory items
router.get('/', async (req, res) => {
    try {
        const items = await Inventory.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new inventory item
router.post('/', async (req, res) => {
    const { name, brand, qty, price } = req.body;

    const newItem = new Inventory({
        name,
        brand,
        qty,
        price
    });

    try {
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an inventory item
router.put('/:id', async (req, res) => {
    const { name, brand, qty, price } = req.body;

    try {
        const updatedItem = await Inventory.findByIdAndUpdate(
            req.params.id,
            { name, brand, qty, price },
            { new: true }
        );

        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an inventory item
router.delete('/:id', async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
