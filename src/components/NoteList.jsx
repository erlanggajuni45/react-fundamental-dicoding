import NoteItem from './NoteItem';
import PropTypes from 'prop-types';
import ActionButtonContainer from './ActionButtons';
function NoteList({ notes }) {
  return (
    <div className='notes-list'>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          createdAt={note.createdAt}
          archived={note.archived}
        />
      ))}
      <ActionButtonContainer page='homepage' />
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      archived: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default NoteList;
