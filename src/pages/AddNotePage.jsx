import React from 'react';

class AddNotePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };
  }
  render() {
    return (
      <div className='add-page'>
        <h2 className='add-page__title'>Buat Catatan</h2>
      </div>
    );
  }
}

export default AddNotePage;
