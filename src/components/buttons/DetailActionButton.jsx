import PropTypes from 'prop-types';

function ArchiveActionButton({ onArchive }) {
  return (
    <button
      className='action'
      onClick={onArchive}
    >
      <svg
        stroke='currentColor'
        fill='currentColor'
        stroke-width='0'
        viewBox='0 0 24 24'
        height='1em'
        width='1em'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill='none'
          d='M0 0h24v24H0V0z'
        ></path>
        <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.81.97H5.44l.8-.97zM5 19V8h14v11H5zm8.45-9h-2.9v3H8l4 4 4-4h-2.55z'></path>
      </svg>
    </button>
  );
}

function UnarchiveActionButton({ onUnarchive }) {
  return (
    <button
      className='action'
      onClick={onUnarchive}
    >
      <svg
        stroke='currentColor'
        fill='currentColor'
        stroke-width='0'
        viewBox='0 0 24 24'
        height='1em'
        width='1em'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill='none'
          d='M0 0h24v24H0V0z'
        ></path>
        <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm3-5h2.55v3h2.9v-3H16l-4-4z'></path>
      </svg>
    </button>
  );
}

function DetailActionButton({ onDelete, onArchive, onUnarchive, archived }) {
  return (
    <>
      {!archived ? (
        <ArchiveActionButton onArchive={onArchive} />
      ) : (
        <UnarchiveActionButton onUnarchive={onUnarchive} />
      )}

      <button
        className='action'
        onClick={onDelete}
      >
        <svg
          stroke='currentColor'
          fill='currentColor'
          stroke-width='0'
          viewBox='0 0 24 24'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='none'
            d='M0 0h24v24H0V0z'
          ></path>
          <path d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z'></path>
        </svg>
      </button>
    </>
  );
}

ArchiveActionButton.propTypes = {
  onArchive: PropTypes.func.isRequired,
};

UnarchiveActionButton.propTypes = {
  onUnarchive: PropTypes.func.isRequired,
};

DetailActionButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
};

export default DetailActionButton;
