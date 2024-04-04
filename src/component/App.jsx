// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import DetailPage from "../pages/DetailPage";
import { getUserLogged, getAccessToken } from "../utils/network-data";
import { LanguageProvider } from "../contexts/LanguageContext";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailNoteId, setDetailNoteId] = useState(null);

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
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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
          <HomePage
            userName={userName}
            handleLogout={handleLogout}
            setCurrentPage={setCurrentPage}
            setDetailNoteId={setDetailNoteId}
          />
        )}
        {detailNoteId && (
          <DetailPage
            userName={userName}
            handleLogout={handleLogout}
            noteId={detailNoteId}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </LanguageProvider>
  );
};

export default App;
