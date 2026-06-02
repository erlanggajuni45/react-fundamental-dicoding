import React from 'react';
import { getActiveNotes, getArchivedNotes } from '../utils/local-data';
import NoteEmpty from '../components/NoteEmpty';
import NoteList from '../components/NoteList';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import SearchNote from '../components/SearchNote';

function HomePageWrapper({ archived }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage
      archived={archived}
      defaultKeyword={keyword}
      onKeywordChange={changeSearchParams}
    />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: this.props.archived ? getArchivedNotes() : getActiveNotes(),
      keyword: props.defaultKeyword || '',
    };

    this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this);
  }

  onKeywordChangeEventHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.onKeywordChange(keyword);
  }

  render() {
    const notes = this.state.notes;
    return notes.length === 0 ? (
      <NoteEmpty />
    ) : (
      <>
        <h2>Catatan {this.props.archived ? 'Arsip' : 'Aktif'}</h2>
        <SearchNote
          onKeywordChange={this.onKeywordChangeEventHandler}
          keyword={this.state.keyword}
        />
        <NoteList notes={notes} />
      </>
    );
  }
}

HomePage.propTypes = {
  archived: PropTypes.bool,
  defaultKeyword: PropTypes.string,
  onKeywordChange: PropTypes.func.isRequired,
};

export default HomePageWrapper;
