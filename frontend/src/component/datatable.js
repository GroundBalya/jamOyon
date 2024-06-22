import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InventoryForm from './inventoryForm';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

const DataTable = ({ data, handleEdit, handleDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [pageNumber, setPageNumber] = useState(0); // Current page number
    const [searchTerm, setSearchTerm] = useState(''); // Search term state

    const itemsPerPage = 10; // Number of items per page
    const pagesVisited = pageNumber * itemsPerPage;
    

     const filteredData = data.filter((item) => {
        return (
            item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const displayData = filteredData.slice(pagesVisited, pagesVisited + itemsPerPage).map((item, index) => (
        <tr key={index}>
            <td>{item.brand}</td>
            <td>{item.model}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.location}</td>
            <td>
                <button
                    className="btn btn-primary"
                    onClick={() => handleModalOpen(index + pagesVisited, item._id)}
                    style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
                >
                    Edit
                </button>
                <button
                    className="btn btn-warning ml-2"
                    onClick={() => confirmDelete(index + pagesVisited, item._id)}
                    style={{ backgroundColor: '#ffc107', borderColor: '#ffc107' }}
                >
                    Delete
                </button>
            </td>
        </tr>
    ));

    const handlePageChange = ({ selected }) => {
        setPageNumber(selected);
    };

    // const handleModalOpen = (index, itemId) => {
    //     setSelectedIndex(index);
    //     setSelectedItemId(itemId);
    //     setShowModal(true);
    // };
    const handleModalOpen = (index, itemId) => {
        const selectedItemIndex = data.findIndex(item => item._id === itemId);
        setSelectedIndex(selectedItemIndex);
        setSelectedItemId(itemId);
        setShowModal(true);
    };
    

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleSaveChanges = (updatedItem) => {
        handleEdit(selectedIndex, updatedItem);
        setShowModal(false);
        Swal.fire('Success', 'Item updated successfully!', 'success');
    };
    const confirmDelete = (index, itemId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(index, itemId);
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
            }
        });
    };
    return (
        <div>
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    width: '100%',
                    boxSizing: 'border-box',
                    border: '1px solid #007bff',
                    borderRadius: '4px'
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Warna</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayData}
                </tbody>
            </table>

            {/* Pagination */}
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={10}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
                forcePage={pageNumber}
            />

            {/* Edit Modal */}
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedIndex !== null && (
                        <InventoryForm
                            currentItem={data[selectedIndex]}
                            handleSave={handleSaveChanges}
                            data={data}
                        />
                    )}
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