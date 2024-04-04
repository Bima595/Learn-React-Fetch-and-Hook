// Di dalam file HomePage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  getAllNotes,
  addNote as addNoteUtil,
  archiveNote as archiveNoteUtil,
  deleteNote as deleteNoteUtil,
} from "../utils/local-data";
import PropTypes from "prop-types";
import { useLanguage } from "../contexts/LanguageContext";
import "../style/Style.css";

const HomePage = ({ handleLogout }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", body: "" });
  const { language, changeLanguage } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllNotes();
      setNotes(data);
    };
    fetchData();
  }, []);

  const handleChangeLanguage = (lang) => {
    changeLanguage(lang);
  };

  const handleAddNote = async () => {
    if (newNote.title && newNote.body) {
      const response = await addNoteUtil(newNote);
      if (!response.error) {
        const updatedNotes = [...notes, response.data];
        setNotes(updatedNotes);
        setNewNote({ title: "", body: "" });
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
      } else {
        alert("Failed to add note");
      }
    }
  };

  const handleArchiveNote = async (id) => {
    const response = await archiveNoteUtil(id);
    if (!response.error) {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, archived: true } : note
      );
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  const handleDeleteNote = async (id) => {
    const response = await deleteNoteUtil(id);
    if (!response.error) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllNotes();
      setNotes(data);
    };
    fetchData();
  }, [notes]);

  return (
    <div className="container">
      <div className="language-buttons">
        <button onClick={() => handleChangeLanguage("en")}>English</button>
        <button onClick={() => handleChangeLanguage("id")}>Indonesian</button>
        <p>
          {language === "en"
            ? "Current language: English"
            : "Bahasa saat ini: Indonesia"}
        </p>
      </div>
      <div>
        <button onClick={handleLogout}>
          {language === "en" ? "Logout" : "Keluar"}
        </button>
      </div>
      <h2>{language === "en" ? "Add New Note:" : "Tambah Catatan Baru:"}</h2>
      <div className="note-form">
        <input
          type="text"
          placeholder={language === "en" ? "Title" : "Judul"}
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder={language === "en" ? "Body" : "Isi"}
          value={newNote.body}
          onChange={(e) => setNewNote({ ...newNote, body: e.target.value })}
        />
        <button onClick={handleAddNote}>
          {language === "en" ? "Add Note" : "Tambah Catatan"}
        </button>
      </div>
      <h2>{language === "en" ? "Notes:" : "Catatan:"}</h2>
      <ul className="notes-list">
        {notes.map((note) => (
          <li key={note.id} className="note-item">
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <p>
              {language === "en" ? "Created At:" : "Dibuat Pada:"}{" "}
              {note.createdAt}
            </p>
            <p>
              {language === "en" ? "Archived:" : "Arsip:"}{" "}
              {note.archived ? "Yes" : "No"}
            </p>
            <button onClick={() => handleArchiveNote(note.id)}>
              {language === "en" ? "Archive" : "Arsipkan"}
            </button>
            <button onClick={() => handleDeleteNote(note.id)}>
              {language === "en" ? "Delete" : "Hapus"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

HomePage.propTypes = {
  userName: PropTypes.string.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default HomePage;
