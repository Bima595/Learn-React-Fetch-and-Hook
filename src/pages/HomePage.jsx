// eslint-disable-next-line no-unused-vars
import React from "react";
import { getAllNotes } from "../utils/local-data";
import PropTypes from "prop-types";

const HomePage = ({ handleLogout }) => {
  const notes = getAllNotes();

  return (
    <div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Notes:</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.body}</p>
            <p>Created At: {note.createdAt}</p>
            <p>Archived: {note.archived ? "Yes" : "No"}</p>
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
