import React from 'react';
import { getActiveNotes, getArchivedNotes } from '../utils/local-data';
import NoteEmpty from '../components/NoteEmpty';
import NoteList from '../components/NoteList';
import PropTypes from 'prop-types';

function HomePage({ archived }) {
  const notes = archived ? getArchivedNotes() : getActiveNotes();
  return notes.length === 0 ? <NoteEmpty /> : <NoteList notes={notes} />;
}

HomePage.propTypes = {
  archived: PropTypes.bool,
};

export default HomePage;
