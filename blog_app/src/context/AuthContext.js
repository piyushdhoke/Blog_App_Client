// Example of setting up AuthContext to store username
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username); // assuming the token includes 'username'
      const decodedUser = jwtDecode(token);
      setUser(decodedUser)
    
      
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    const decoded = jwtDecode(token);
    setUsername(decoded.username); // Update the username
    const decodedUser = jwtDecode(token);
    setUser(decodedUser)
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUsername("");
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ token,username, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  );
};
