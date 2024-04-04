// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import { getUserLogged, getAccessToken } from "../utils/network-data";
import { LanguageProvider } from "../contexts/LanguageContext";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    setCurrentPage("login");
    setUserName("");
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      getUserLogged()
        .then((response) => {
          if (!response.error) {
            setUserName(response.data.name);
            setCurrentPage("homepage");
          } else {
            localStorage.removeItem("accessToken");
          }
          setLoading(false); // Set loading to false after data is loaded
        })
        .catch(() => {
          setLoading(false); // Set loading to false if data loading fails
        });
    } else {
      setLoading(false); // Set loading to false if there is no access token
    }
  }, []); // Run only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  return (
    <LanguageProvider>
      <div>
        {currentPage === "login" && (
          <LoginPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "register" && (
          <RegisterPage setCurrentPage={setCurrentPage} />
        )}
        {currentPage === "homepage" && (
          <HomePage userName={userName} handleLogout={handleLogout} />
        )}
      </div>
    </LanguageProvider>
  );
};

export default App;
