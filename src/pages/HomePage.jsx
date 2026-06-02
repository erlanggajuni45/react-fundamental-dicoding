import React from 'react';
import { getActiveNotes } from '../utils/local-data';
import NoteEmpty from '../components/NoteEmpty';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getActiveNotes(),
    };
  }

  render() {
    const { notes } = this.state;
    return notes.length === 0 ? <NoteEmpty /> : <h2>HAI</h2>;
  }
}

export default HomePage;
