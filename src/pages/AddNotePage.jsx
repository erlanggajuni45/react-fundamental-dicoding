import React from 'react';
import ActionButtonContainer from '../components/ActionButtons';
import { addNote } from '../utils/network-data';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function AddNotePageWrapper() {
  const navigate = useNavigate();
  const { locale } = useContext(GlobalContext);

  function onAddNoteEventHandler(note) {
    addNote(note);
    navigate('/');
  }
  return (
    <AddNotePage
      onAddNote={onAddNoteEventHandler}
      locale={locale}
    />
  );
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
    if (!title.trim() || !body.trim()) {
      alert(
        this.props.locale === 'id'
          ? 'Title dan body tidak boleh kosong!'
          : 'Title and body cannot be empty!',
      );
      return;
    }
    this.props.onAddNote({ title, body });
  }

  render() {
    return (
      <>
        <div className='add-new-page__input'>
          <div
            className='add-new-page__input__title'
            data-placeholder={this.props.locale === 'id' ? 'Catatan rahasia' : 'Secret note'}
            contentEditable
            onInput={this.onTitleChangeEventHandler}
          />
          <div
            className='add-new-page__input__body'
            data-placeholder={
              this.props.locale === 'id' ? 'Sebenarnya saya adalah ....' : 'Actually I am ....'
            }
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
  locale: PropTypes.oneOf(['id', 'en']).isRequired,
};

export default AddNotePageWrapper;
