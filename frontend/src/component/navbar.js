// src/components/Navbar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/jamoyon.png";
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(135deg, #ffd700, #007bff)' }}>
            <div className="container">
                <a className="navbar-brand" href="/">Jam Oyon</a>
          
                <div className="collapse navbar-collapse" id="navbarNav">
                <div className="flex-shrink-1">
                      <img className="h-10 w-10 rounded-full" src={logo} alt="Your Company" />
                    </div>
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