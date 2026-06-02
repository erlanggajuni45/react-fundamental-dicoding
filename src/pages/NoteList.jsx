import React from 'react';
import { getAllNotes } from '../utils/local-data';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: getActiveNotes(),
    };
  }

  render() {
    return <h2>Halaman Beranda nyeneyneeye</h2>;
  }
}

export default HomePage;
