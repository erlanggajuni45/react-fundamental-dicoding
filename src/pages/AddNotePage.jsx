import React from 'react';
import ActionButtonContainer from '../components/ActionButtons';
import { addNote } from '../utils/local-data';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AddNotePageWrapper() {
  const navigate = useNavigate();

  function onAddNoteEventHandler(note) {
    addNote(note);
    navigate('/');
  }
  return <AddNotePage onAddNote={onAddNoteEventHandler} />;
}

class AddNotePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onAddNoteEventHandler = this.onAddNoteEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.innerHTML,
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  onAddNoteEventHandler() {
    const { title, body } = this.state;
    this.props.onAddNote({ title, body });
  }

  render() {
    return (
      <>
        <div className='add-new-page__input'>
          <div
            className='add-new-page__input__title'
            data-placeholder='Catatan rahasia'
            contentEditable
            onInput={this.onTitleChangeEventHandler}
          />
          <div
            className='add-new-page__input__body'
            data-placeholder='Sebenarnya saya adalah ....'
            contentEditable
            onInput={this.onBodyChangeEventHandler}
          />
          <ActionButtonContainer
            page='add-new-page'
            onAdd={this.onAddNoteEventHandler}
          />
        </div>
      </>
    );
  }
}

AddNotePage.propTypes = {
  onAddNote: PropTypes.func.isRequired,
};

export default AddNotePageWrapper;
