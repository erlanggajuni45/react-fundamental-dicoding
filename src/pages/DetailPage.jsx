import React from 'react';
import { useParams } from 'react-router-dom';
import { getNote } from '../utils/local-data';
import { showFormattedDate } from '../utils';
import NotFoundPage from './NotFoundPage';

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
    if (this.state.note === undefined) {
      return <NotFoundPage />;
    }
    return (
      <div className='detail-page'>
        <h2 className='detail-page__title'>{this.state.note.title}</h2>
        <p className='detail-page__createdAt'>{showFormattedDate(this.state.note.createdAt)}</p>
        <div className='detail-page__body'>{this.state.note.body}</div>
      </div>
    );
  }
}

export default DetailPageWrapper;
