import useInput from '../hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import { login, putAccessToken } from '../utils/network-data';

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const onSubmitEventHandler = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('Email dan password harus diisi!');
      return;
    }

    const { error, data } = await login({ email, password });

    if (!error) {
      putAccessToken(data.accessToken);
      navigate('/');
    } else {
      alert('Login gagal! Periksa kembali email dan password Anda.');
    }
  };

  return (
    <>
      <h2>Yuk, login untuk menggunakan aplikasi.</h2>
      <form
        className='input-login'
        onSubmit={onSubmitEventHandler}
      >
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
