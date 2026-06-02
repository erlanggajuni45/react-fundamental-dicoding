function SearchNote({ keyword, onKeywordChange }) {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Cari catatan...'
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
      />
    </div>
  );
}

export default SearchNote;
