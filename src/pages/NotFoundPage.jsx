import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function NotFoundPage() {
  const { locale } = useContext(GlobalContext);
  return (
    <div>
      <h2>{locale === 'id' ? '404 Tidak Ditemukan' : '404 Not Found'}</h2>
      <p>
        {locale === 'id'
          ? 'Halaman yang Anda cari tidak ditemukan.'
          : 'The page you are looking for does not exist.'}
      </p>
    </div>
  );
}

export default NotFoundPage;
