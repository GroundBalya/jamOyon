// src/components/AddItemForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddItemForm = ({ handleAdd }) => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        quantity: '',
        price: '',
        location: ''
    });
// tes comment 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd(formData);
        setFormData({
            brand: '',
            model: '',
            quantity: '',
            price: '',
            location: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Brand</label>
                <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Warna</label>
                <input type="text" className="form-control" name="model" value={formData.model} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Location</label>
                <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">Add Item</button>
        </form>
    );
};

export default AddItemForm;
