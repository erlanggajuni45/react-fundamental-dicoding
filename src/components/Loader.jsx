import { BounceLoader } from 'react-spinners';
import PropTypes from 'prop-types';

function Loader({ theme }) {
  return (
    <div className='loader-container'>
      <BounceLoader
        color={theme === 'light' ? 'black' : 'gray'}
        loading={true}
        size={150}
      />
    </div>
  );
}

Loader.propTypes = {
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
};

export default Loader;
