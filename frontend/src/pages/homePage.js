// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbar';
import DataTable from '../component/datatable';
import AddItemForm from '../component/addItemForm';
import db from '../config/firebaseConfig';
import { ref, get, child, push, update, remove } from "firebase/database";
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(db);
                const snapshot = await get(child(dbRef, 'inventory'));
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if (data) {
                        const inventoryList = Object.keys(data).map(key => ({
                            _id: key,
                            ...data[key]
                        }));
                        setInventory(inventoryList);
                    }
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddItem = async (newItem) => {
        try {
            const newItemRef = push(ref(db, 'inventory'));
            await update(newItemRef, newItem);
            setInventory([...inventory, { _id: newItemRef.key, ...newItem }]);
            console.log('Added new item:', newItem);
        } catch (error) {
            console.error('Error adding new item:', error);
        }
    };

    const handleSaveChanges = async (index, updatedItem) => {
        try {
            await update(ref(db, `inventory/${updatedItem._id}`), updatedItem);
            const updatedInventory = [...inventory];
            updatedInventory[index] = updatedItem;
            setInventory(updatedInventory);
            console.log('Updated item:', updatedItem);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    const handleDelete = async (index, itemId) => {
        try {
            await remove(ref(db, `inventory/${itemId}`));
            const updatedInventory = inventory.filter(item => item._id !== itemId);
            setInventory(updatedInventory);
            console.log('Deleted item with ID:', itemId);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-primary mb-4 text-center">Inventory</h2>
                
                <DataTable data={inventory} handleEdit={handleSaveChanges} handleDelete={handleDelete} />
                <h2 className="text-primary mt-4 text-center">Add Item</h2>
                <AddItemForm handleAdd={handleAddItem} />
            </div>
        </div>
    );
};

export default HomePage;
