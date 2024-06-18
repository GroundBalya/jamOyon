import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InventoryForm = ({ currentItem, handleSave }) => {
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        quantity: '',
        price: '',
        location: ''
    });

    useEffect(() => {
        if (currentItem) {
            setFormData({
                _id: currentItem._id || '',
                brand: currentItem.brand,
                model: currentItem.model,
                quantity: currentItem.quantity,
                price: currentItem.price,
                location: currentItem.location
            });
        }
    }, [currentItem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Brand</label>
                <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label>Model</label>
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
            <button type="submit" className="btn btn-primary btn-block mt-2">Save</button>
        </form>
    );
};

export default InventoryForm;
