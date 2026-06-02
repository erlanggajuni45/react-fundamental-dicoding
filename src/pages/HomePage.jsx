import React from 'react';
import { getActiveNotes } from '../utils/local-data';
import NoteEmpty from '../components/NoteEmpty';
import NoteList from '../components/NoteList';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getActiveNotes(),
    };
  }

  render() {
    const { notes } = this.state;
    return notes.length === 0 ? <NoteEmpty /> : <NoteList notes={notes} />;
  }
}

export default HomePage;
