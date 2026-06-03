import useInput from '../hooks/useInput';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  return (
    <>
      <h2>Yuk, login untuk menggunakan aplikasi.</h2>
      <form className='input-login'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={setEmail}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={setPassword}
        />
        <button type='submit'>Login</button>
      </form>
      <p>
        Belum punya akun? <Link to='/register'>Daftar di sini</Link>
      </p>
    </>
  );
}

export default LoginPage;
