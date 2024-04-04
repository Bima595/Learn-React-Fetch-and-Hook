// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import {
  archiveNote as archiveNoteUtil,
  getAllNotes,
} from "../utils/local-data";

import { deleteNote } from "../utils/network-data";
import { addNote, getActiveNotes } from "../utils/network-data";
import PropTypes from "prop-types";
import { useLanguage } from "../contexts/LanguageContext";
import "../style/Style.css";

const HomePage = ({
  handleLogout,
  setCurrentPage,
  setDetailNoteId,
}) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", body: "" });
  const { language, changeLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await getActiveNotes();
      if (!response.error) {
        const activeNotesFromApi = response.data.map((note) => ({
          ...note,
          fromApi: true,
        }));
        const activeNotesCombined = [...activeNotesFromApi, ...getAllNotes()];
        setNotes(activeNotesCombined);
      }
    };
    fetchData();
  }, []);

  const handleChangeLanguage = (lang) => {
    changeLanguage(lang);
  };

  const handleAddNote = async () => {
    if (newNote.title && newNote.body) {
      const response = await addNote(newNote);
      if (!response.error) {
        const updatedNotes = [...notes, { ...response.data, fromApi: true }];
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
    const note = notes.find((note) => note.id === id);
    if (!note) {
      console.error("Note not found");
      return;
    }

    let deleteFromApiSuccess = true;
    if (note.fromApi) {
      const response = await deleteNote(id);
      deleteFromApiSuccess = !response.error;
      if (!deleteFromApiSuccess) {
        console.error("Failed to delete note from API");
      }
    }

    if (deleteFromApiSuccess) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  const handleDeleteLocalNote = (id) => {
    try {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Failed to delete note locally:", error);
      // Tambahkan penanganan error sesuai kebutuhan
    }
  };

  const handleTitleClick = (id) => {
    setDetailNoteId(id);
    setCurrentPage("detail");
  };

  return (
    <div className="container">
      <button onClick={() => handleChangeLanguage("en")}>English</button>
      <button onClick={() => handleChangeLanguage("id")}>Indonesian</button>
      <p>
        {language === "en"
          ? "Current language: English"
          : "Bahasa saat ini: Indonesia"}
      </p>
      <div>
        <button onClick={handleLogout}>
          {language === "en" ? "Logout" : "Keluar"}
        </button>
      </div>
      <div className="header">
        <input
          type="text"
          className="search-container"
          placeholder={language === "en" ? "Search Notes" : "Cari Catatan"}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <h2>{language === "en" ? "Add New Note:" : "Tambah Catatan Baru:"}</h2>
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
      <h2>{language === "en" ? "Notes:" : "Catatan:"}</h2>
      {filteredNotes.length > 0 ? (
        <ul>
          {filteredNotes.map((note) => (
            <li key={note.id} onClick={() => handleTitleClick(note.id)}>
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
              <button
                className="archive-button"
                onClick={() => handleArchiveNote(note.id)}
              >
                {language === "en" ? "Archive" : "Arsipkan"}
              </button>
              <button
                className="delete-button"
                onClick={() => {
                  handleDeleteNote(note.id, note.fromApi);
                  if (!note.fromApi) {
                    handleDeleteLocalNote(note.id);
                  }
                }}
              >
                {language === "en" ? "Delete" : "Hapus"}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center font-large">Data tidak ada</p>
      )}
    </div>
  );
};

HomePage.propTypes = {
    userName: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    setDetailNoteId: PropTypes.func.isRequired,
  };
  

export default HomePage;
