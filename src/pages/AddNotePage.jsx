import React from 'react';
import ActionButtonContainer from '../components/ActionButtons';

class AddNotePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };
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

  render() {
    return (
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
        <ActionButtonContainer page='addnotepage' />
      </div>
    );
  }
}

export default AddNotePage;
