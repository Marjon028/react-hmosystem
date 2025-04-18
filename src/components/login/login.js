import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"; // Importing necessary modules from react-router-dom
import {jwtDecode} from "jwt-decode";
import Register from './registration.js'
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [loginHome  , setLoginHome] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from local storage
        setSuccess(false); // Reset success state
        setError('')
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setLoading(true); // Set loading to true while the request is being made

        try {
            const response = await fetch('https://hcs-dev.1coophealth.com/login/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }), // Send username and password as JSON
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            const data = await response.json();
            console.log('data', data['your token'])
            const decoded = jwtDecode( data['your token']); // Decode the token
            const currentTime = Math.floor(Date.now() / 1000);
            //console.log('expired', decoded.exp)
            
            localStorage.setItem('token', data['your token']); // Store the token in local storage
            setSuccess(true); // Set success to true if the request is successful
            setError(''); // Clear any previous errors
        } catch (err) {
            console.error('Error:', err.message);
            setError(err.message); // Set the error message
            setSuccess(false); // Ensure success is false if there's an error
        } finally {
            setLoading(false); // Set loading to false after the request is complete
        }
    };

    const handleToggleRegister = () =>{
        setLoginHome(!loginHome);
    }
    return (
        <>
        <button  onClick={handleToggleRegister}> {loginHome? 'login' : 'register'}</button>
        
        { loginHome? <Register/> :
            <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>Login successful!</p>}

            { <button onClick={handleLogout}>Logout</button>}
        </div>}
        </>

       
    );
};

export default Login;
