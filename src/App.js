import React from 'react';
import loginPureComponent from './components/login/loginPureComponent'; 
import Login from './components/login/login'; 
import { isTokenExpired } from './utils/auth';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom"; // Importing necessary modules from react-router-dom
import Home from './components/home'
import ProtectedRoute from './utils/protectedRoute';
import childDocument from './components/ContextPages/childDocument';


const isAuthenticated = () => {
  // Check if the user is authenticated
  // This function checks if the token is present and not expired
  const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
  
  return token && !isTokenExpired(token);
}
function App() {
 
  
 
  return (
    <div className="App">
 
     
            <Router>
                <Routes>
                  
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated()}>
                         

                          <Home />
                       
                       
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/home"
                      element={
                        <ProtectedRoute isAuthenticated={isAuthenticated()}>
                       <Home>  </Home>
                    </ProtectedRoute>
                      }
                    />
                </Routes>
            </Router>
      
    </div>
  );
}

export default App;
