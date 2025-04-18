import React from 'react';
import loginPureComponent from './components/login/loginPureComponent'; 
import Login from './components/login/login'; 
import { isTokenExpired } from './utils/auth';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"; // Importing necessary modules from react-router-dom

import Home from './components/home'

const isAuthenticated = () => {
  // Check if the user is authenticated
  const token = localStorage.getItem('token');
  
  return token && !isTokenExpired(token);
}
function App() {
 
  
 
  return (
    <div className="App">
 
     
            <Router>
                <Routes>
                  
                    <Route path="/" element={ isAuthenticated() ? < Home /> : <Login/>} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
      
    </div>
  );
}

export default App;
