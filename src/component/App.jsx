// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    setCurrentPage('login');
    setUserName('');
  };

  

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
