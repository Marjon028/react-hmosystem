import {jwtDecode} from "jwt-decode";

// Function to check if the token is expired
export const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token); // Decode the token
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        
        return decoded.exp < currentTime; // Check if the token is expired
    } catch (err) {
        console.error("Invalid token:", err);
        return true; // Treat invalid tokens as expired
    }
};