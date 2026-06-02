import React from 'react';
import ActionButtonContainer from '../components/ActionButtons';
import { addNote } from '../utils/local-data';

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
    addNote({ title, body });
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

export default AddNotePage;
