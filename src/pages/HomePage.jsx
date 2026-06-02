import React from 'react';
import { getActiveNotes, getArchivedNotes } from '../utils/local-data';
import NoteEmpty from '../components/NoteEmpty';
import NoteList from '../components/NoteList';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import SearchNote from '../components/SearchNote';
import ActionButtonContainer from '../components/ActionButtons';

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

  componentDidUpdate(prevProps) {
    if (prevProps.archived !== this.props.archived) {
      this.setState({
        notes: this.props.archived ? getArchivedNotes() : getActiveNotes(),
      });
    }

    if (prevProps.defaultKeyword !== this.props.defaultKeyword) {
      this.setState({
        keyword: this.props.defaultKeyword || '',
      });
    }
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
    const notes = this.state.notes.filter((note) => {
      return note.title.toLowerCase().includes(this.state.keyword.toLowerCase());
    });
    return (
      <>
        <div>
          <h2>Catatan {this.props.archived ? 'Arsip' : 'Aktif'}</h2>
          <SearchNote
            onKeywordChange={this.onKeywordChangeEventHandler}
            keyword={this.state.keyword}
          />
        </div>
        {notes.length === 0 ? <NoteEmpty /> : <NoteList notes={notes} />}
        {!this.props.archived && <ActionButtonContainer page='homepage' />}
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
