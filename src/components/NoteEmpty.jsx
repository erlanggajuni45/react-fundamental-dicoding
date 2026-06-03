import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function NoteEmpty() {
  const { locale } = useContext(GlobalContext);
  return (
    <div className='notes-list-empty'>
      <p className='notes-list-empty__message'>
        {locale === 'id' ? 'Tidak ada catatan' : 'No notes'}
      </p>
    </div>
  );
}

export default NoteEmpty;
