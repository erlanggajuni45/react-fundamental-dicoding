import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div>
      <h2>Isi form untuk mendaftar akun.</h2>

      <form className='input-register'>
        <label htmlFor='name'>Nama</label>
        <input
          type='text'
          id='name'
          name='name'
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
        />
        <label htmlFor='confirmPassword'>Konfirmasi Password</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
        />
        <button type='submit'>Daftar</button>
      </form>

      <p>
        Sudah punya akun? <Link to='/login'>Login di sini</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
