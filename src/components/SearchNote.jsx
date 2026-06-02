import PropTypes from 'prop-types';

function SearchNote({ keyword, onKeywordChange }) {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Cari berdasarkan judul...'
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
      />
    </div>
  );
}

SearchNote.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChange: PropTypes.func.isRequired,
};

export default SearchNote;
