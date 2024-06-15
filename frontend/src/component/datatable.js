import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryForm from './inventoryForm';
const DataTable = ({ data, handleEdit, handleDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleModalOpen = (index) => {
        setSelectedIndex(index);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSaveChanges = (updatedItem) => {
        handleEdit(selectedIndex, updatedItem);
        setShowModal(false);
    };

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.location}</td>
                            <td>
                                <button
                                    className="btn btn-primary me-4"
                                    onClick={() => handleModalOpen(index)}
                                    style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-warning ml-2"
                                    onClick={() => handleDelete(index)}
                                    style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InventoryForm currentItem={data[selectedIndex]} handleSave={handleSaveChanges} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DataTable;