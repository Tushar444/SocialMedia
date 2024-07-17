import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(false);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const login = async (inputs) => {
    const res = await makeRequest.post("/auth/login", inputs, {
      withCredentials: true,
    });

    console.log(res.data);
    setCurrentUser(res.data);
  };

  const navigate = useNavigate();

  const logout = async () => {
    await makeRequest.post("/auth/logout");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
