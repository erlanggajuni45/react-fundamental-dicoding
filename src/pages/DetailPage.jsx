import React from 'react';
import { useParams } from 'react-router-dom';
import { getNote } from '../utils/local-data';
import { showFormattedDate } from '../utils';
import NotFoundPage from './NotFoundPage';
import PropTypes from 'prop-types';

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={id} />;
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
        <div className='detail-page__body'>{note.body}</div>
      </div>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailPageWrapper;
