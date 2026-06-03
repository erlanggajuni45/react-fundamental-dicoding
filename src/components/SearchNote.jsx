import PropTypes from 'prop-types';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function SearchNote({ keyword, onKeywordChange }) {
  const { locale } = useContext(GlobalContext);
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder={locale === 'id' ? 'Cari berdasarkan judul...' : 'Search by title...'}
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
