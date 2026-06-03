import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import NotFoundPage from './NotFoundPage';
import PropTypes from 'prop-types';
import ActionButtonContainer from '../components/ActionButtons';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import parser from 'html-react-parser';
import GlobalContext from '../context/GlobalContext';
import Loader from '../components/Loader';

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(GlobalContext);

  async function onDeleteEventHandler() {
    await deleteNote(id);
    navigate('/');
  }

  async function onArchiveEventHandler() {
    await archiveNote(id);
    navigate('/');
  }

  async function onUnarchiveEventHandler() {
    await unarchiveNote(id);
    navigate('/');
  }

  return (
    <DetailPage
      id={id}
      onDelete={onDeleteEventHandler}
      onArchive={onArchiveEventHandler}
      onUnarchive={onUnarchiveEventHandler}
      theme={theme}
    />
  );
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    const { data } = await getNote(id);
    this.setState({
      note: data,
      isLoading: false,
    });
  }

  render() {
    const { note, isLoading } = this.state;

    if (isLoading) {
      return <Loader theme={this.props.theme} />;
    }

    return !note ? (
      <NotFoundPage />
    ) : (
      <div className='detail-page'>
        <h2 className='detail-page__title'>{note.title}</h2>
        <p className='detail-page__createdAt'>{showFormattedDate(note.createdAt)}</p>
        <div className='detail-page__body'>{parser(note.body)}</div>

        <ActionButtonContainer
          page='detail-page'
          archived={note.archived}
          onDelete={this.props.onDelete}
          onArchive={this.props.onArchive}
          onUnarchive={this.props.onUnarchive}
        />
      </div>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default DetailPageWrapper;
