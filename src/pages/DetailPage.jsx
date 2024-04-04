// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getNoteById } from "../utils/network-data";
import { getAllNotes } from "../utils/local-data";

const DetailPage = ({ handleLogout, noteId, setCurrentPage }) => {
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const allNotes = getAllNotes();
      const noteFromLocal = allNotes.find((note) => note.id === noteId);
      if (noteFromLocal) {
        setNote(noteFromLocal);
      } else {
        const response = await getNoteById(noteId);
        if (!response.error) {
          setNote(response.data);
        }
      }
    };
    fetchData();
  }, [noteId]);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Note Detail:</h2>
      {note ? (
        <div>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <p>Created At: {note.createdAt}</p>
          <p>Archived: {note.archived ? "Yes" : "No"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={() => setCurrentPage("homepage")}>Back to Homepage</button>
    </div>
  );
};

DetailPage.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  noteId: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default DetailPage;