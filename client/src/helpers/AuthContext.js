import { createContext } from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';


export const AuthContext = createContext("");

export const AuthContextProvider = ({ children }) => {
const [authState, setAuthState] = useState({ 
    username: "", 
    email: "", 
    status: false 
  });



  useEffect(() => {
    axios
      .get("http://localhost:3001/register/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState((prevState) => ({
            ...prevState,
            status: false,
          }));
        } else {
          setAuthState({
            username: response.data.username,
            email: response.data.email,
            status: true,
          });
        }
      });
  }, []);


  const login = (userData) => {
    setAuthState({
        username: userData.username,
        email: userData.email,
        id: userData.id,
        status: true,
    });
 };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", email: "", status: false });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout ,login}}>
      {children}
    </AuthContext.Provider>
  );

};