import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbar';
import DataTable from '../component/datatable';
import  db from '../config/firebaseConfig';
import { ref, get, child, update, remove, push } from "firebase/database";
import { Spinner, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);  // Start loading
            try {
                const dbRef = ref(db);
                const snapshot = await get(child(dbRef, 'inventory'));
                const data = snapshot.val();
                if (data) {
                    const inventoryList = Object.keys(data).map(key => ({
                        _id: key,
                        ...data[key]
                    }));
                    setInventory(inventoryList);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);  // End loading
        };

        fetchData();
    }, []);

    const handleSaveChanges = async (index, updatedItem) => {
        setLoading(true);  // Start loading
        try {
            const dbRef = ref(db, `inventory/${updatedItem._id}`);
            const updatedData = { ...updatedItem };
            delete updatedData._id; // Remove the _id from the object being updated
            await update(dbRef, updatedData);
            const updatedInventory = [...inventory];
            updatedInventory[index] = updatedItem;
            setInventory(updatedInventory);
            console.log('Updated item:', updatedItem);
            Swal.fire('Success', 'Item updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating item:', error);
            Swal.fire('Error', 'Failed to update item.', 'error');
        }
        setLoading(false);  // End loading
    };

    const handleDelete = async (index, itemId) => {
        setLoading(true);  // Start loading
        try {
            const dbRef = ref(db, `inventory/${itemId}`);
            await remove(dbRef);
            const updatedInventory = inventory.filter(item => item._id !== itemId);
            setInventory(updatedInventory);
            console.log('Deleted item with ID:', itemId);
            Swal.fire('Success', 'Item deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting item:', error);
            Swal.fire('Error', 'Failed to delete item.', 'error');
        }
        setLoading(false);  // End loading
    };

    const handleAddItem = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Add New Item',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Brand">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Warna">` +
                `<input id="swal-input3" class="swal2-input" placeholder="Quantity" type="number">` +
                `<input id="swal-input4" class="swal2-input" placeholder="Price" type="number">` +
                `<input id="swal-input5" class="swal2-input" placeholder="Location">`,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    brand: document.getElementById('swal-input1').value,
                    model: document.getElementById('swal-input2').value,
                    quantity: parseInt(document.getElementById('swal-input3').value),
                    price: parseFloat(document.getElementById('swal-input4').value),
                    location: document.getElementById('swal-input5').value,
                }
            }
        });

        if (formValues) {
            const { brand, model, location } = formValues;
            // Check for duplicates
            const isDuplicate = inventory.some(item =>
                item.brand.toLowerCase() === brand.toLowerCase() &&
                item.model.toLowerCase() === model.toLowerCase() &&
                item.location.toLowerCase() === location.toLowerCase()
            );

            if (isDuplicate) {
                Swal.fire('Error', 'Duplicate item found. Cannot add the item.', 'error');
            } else {
                setLoading(true);  // Start loading
                try {
                    const dbRef = ref(db, 'inventory');
                    const newItemRef = await push(dbRef, formValues);
                    const newItem = { _id: newItemRef.key, ...formValues };
                    setInventory(prevInventory => [...prevInventory, newItem]);
                    Swal.fire('Success', 'Item added successfully!', 'success');
                } catch (error) {
                    console.error('Error adding item:', error);
                    Swal.fire('Error', 'Failed to add item.', 'error');
                }
                setLoading(false);  // End loading
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <h2 className="text-primary mb-4 text-center">Data Stock Jam</h2>
                <div className="mb-4 text-center">
                    <Button variant="success" onClick={handleAddItem}>Add Item</Button>
                </div>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <DataTable data={inventory} handleEdit={handleSaveChanges} handleDelete={handleDelete} />
                )}
            </div>
        </div>
    );
};

export default HomePage;