import React, { useState, useEffect } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import { getUserLogged, getAccessToken } from "../utils/network-data";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    setCurrentPage('login');
    setUserName('');
    localStorage.removeItem('accessToken');
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      getUserLogged().then((response) => {
        if (!response.error) {
          setUserName(response.data.name);
          setCurrentPage('homepage');
        } else {
          localStorage.removeItem('accessToken');
        }
      });
    }
  }, []); // Run only once when the component mounts

  return (
    <div>
      {currentPage === "login" && <LoginPage setCurrentPage={setCurrentPage} />}
      {currentPage === "register" && (
        <RegisterPage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'homepage' && <HomePage userName={userName} handleLogout={handleLogout} />}
    </div>
  );
};

export default App;
