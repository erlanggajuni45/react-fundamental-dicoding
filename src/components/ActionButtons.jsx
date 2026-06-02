import PropTypes from 'prop-types';
import HomeActionButton from './buttons/HomePageButton';
import AddNoteActionButton from './buttons/AddNoteActionButton';
import DetailActionButton from './buttons/DetailActionButton';

function ActionButtonContainer({ page, onAdd, onDelete, onArchive, onUnarchive, archived }) {
  return (
    <div className={`${page}__action`}>
      {page === 'homepage' && <HomeActionButton />}
      {page === 'add-new-page' && <AddNoteActionButton onAdd={onAdd} />}
      {page === 'detail-page' && (
        <DetailActionButton
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
          archived={archived}
        />
      )}
    </div>
  );
}

ActionButtonContainer.propTypes = {
  page: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
  archived: PropTypes.bool,
};

export default ActionButtonContainer;
