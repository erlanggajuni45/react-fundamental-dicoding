import React, { useContext } from 'react';
import { getActiveNotes, getArchivedNotes } from '../utils/network-data';
import NoteEmpty from '../components/NoteEmpty';
import NoteList from '../components/NoteList';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import SearchNote from '../components/SearchNote';
import ActionButtonContainer from '../components/ActionButtons';
import GlobalContext from '../context/GlobalContext';
import Loader from '../components/Loader';

function HomePageWrapper({ archived }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { theme, locale } = useContext(GlobalContext);

  const keyword = searchParams.get('keyword');

  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage
      archived={archived}
      defaultKeyword={keyword}
      onKeywordChange={changeSearchParams}
      theme={theme}
      locale={locale}
    />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      keyword: props.defaultKeyword || '',
      isLoading: true,
    };

    this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = this.props.archived ? await getArchivedNotes() : await getActiveNotes();
    this.setState({
      notes: data,
      isLoading: false,
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.archived !== this.props.archived) {
      this.setState({
        isLoading: true,
      });

      const { data } = this.props.archived ? await getArchivedNotes() : await getActiveNotes();

      this.setState({
        notes: data,
        isLoading: false,
      });
    }

    if (prevProps.defaultKeyword !== this.props.defaultKeyword) {
      this.setState({
        keyword: this.props.defaultKeyword || '',
      });
    }
  }

  onKeywordChangeEventHandler(keyword) {
    this.setState({
      keyword,
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
          {this.props.locale === 'id' ? (
            <h2> Catatan {this.props.archived ? 'Arsip' : 'Aktif'}</h2>
          ) : (
            <h2> {this.props.archived ? 'Archived' : 'Active'} Note</h2>
          )}
          <SearchNote
            onKeywordChange={this.onKeywordChangeEventHandler}
            keyword={this.state.keyword}
          />
        </div>
        {this.state.isLoading ? (
          <Loader theme={this.props.theme} />
        ) : notes.length === 0 ? (
          <NoteEmpty />
        ) : (
          <NoteList notes={notes} />
        )}
        {!this.props.archived && <ActionButtonContainer page='homepage' />}
      </>
    );
  }
}

HomePage.propTypes = {
  archived: PropTypes.bool,
  defaultKeyword: PropTypes.string,
  onKeywordChange: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  locale: PropTypes.oneOf(['id', 'en']).isRequired,
};

export default HomePageWrapper;
