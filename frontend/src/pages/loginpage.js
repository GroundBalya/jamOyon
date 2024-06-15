// src/pages/LoginPage.js
import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
// import './loginPage.css'
import Form from "../component/formLogin";
import logo from "../assets/jamoyon.png";
const LoginPage = () => {
    

    return (
    //     <div className="login-container">
    //         <div className="login-form">
    //             <h2 className="text-center">Login</h2>
    //             <form onSubmit={handleLogin}>
    //                 <div className="form-group">
    //                     <label>Username</label>
    //                     <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
    //                 </div>
    //                 <div className="form-group">
    //                     <label>Password</label>
    //                     <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
    //                 </div>
    //                 <button type="submit" className="btn btn-primary btn-block">Login</button>
    //             </form>
    //         </div>
    //     </div>
    // );

    <div className="flex w-full h-screen bg-indigo-950">
    <div className="w-full flex items-center justify-center lg:w-1/2">
      <Form />
    </div>
    <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-yellow-500 ">
      <div className="w-60 h-60   ">
        <img src={logo} alt="logo " className="animate-bounce rounded-full"></img>
      </div>
      <div className="w-full h-1/2 absolute bg-white/10 backdrop-blur-lg bottom-0"></div>
    </div>
  </div>
);
};

export default LoginPage;