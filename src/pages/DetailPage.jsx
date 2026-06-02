import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNote } from '../utils/local-data';
import { showFormattedDate } from '../utils';
import NotFoundPage from './NotFoundPage';
import PropTypes from 'prop-types';
import ActionButtonContainer from '../components/ActionButtons';
import { deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import parser from 'html-react-parser';

function DetailPageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  function onDeleteEventHandler() {
    deleteNote(id);
    navigate('/');
  }

  function onArchiveEventHandler() {
    archiveNote(id);
    navigate('/');
  }

  function onUnarchiveEventHandler() {
    unarchiveNote(id);
    navigate('/');
  }

  return (
    <DetailPage
      id={id}
      onDelete={onDeleteEventHandler}
      onArchive={onArchiveEventHandler}
      onUnarchive={onUnarchiveEventHandler}
    />
  );
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: getNote(props.id),
    };
  }
  render() {
    const { note } = this.state;

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
};

export default DetailPageWrapper;
