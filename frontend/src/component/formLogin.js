import {React,useState} from "react";
import { useNavigate } from 'react-router-dom';
function Form() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === 'Admin' && password === 'password') {
            navigate('/home');
        } else {
            alert('Invalid credentials');
        }
    };
  return (
    <div className=" backdrop-blur-xl px-10 py-10 rounded-3xl  ">
      <h3 className="text-5xl text-yellow-600  text-center mb-10 font-extrabold">
        Jam<span className="text-5xl text-gray-100  text-center mb-10 font-extrabold">Oyon </span>Store
      </h3>
      <div className="bg-white px-5 py-10 rounded-3xl border-2  ">
        <h1 className="text-5xl text-yellow-600 font-semibold text-center mt-1">Welcome</h1>
        <p className="text-lg text-yellow-800 font-medium mt-4">please enter your Username & Password </p>

        <form onSubmit={handleLogin}>
          <div>
            <label className="text-lg font-medium text-yellow-600">Username</label>
            <input className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter Your Username"  value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label className="text-lg font-medium text-yellow-600">Password</label>
            <input className="w-full border-2 border-gray-200 rounded-xl p-4 mt-1 bg-transparent" placeholder="Enter Your Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-2">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Form;