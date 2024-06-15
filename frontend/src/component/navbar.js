// src/components/Navbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ background: 'linear-gradient(135deg, #ffd700, #007bff)' }}>
            <div className="container">
                <a className="navbar-brand" href="/">Inventory System</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                        {/* Add other navigation links as needed */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;