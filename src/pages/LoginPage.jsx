import useInput from '../hooks/useInput';
import { Link, useNavigate } from 'react-router-dom';
import { login, putAccessToken } from '../utils/network-data';
import { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { getUserLogged } from '../utils/network-data';
import Loader from '../components/Loader';

function LoginPage() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const { setAuthedUser, theme, locale } = useContext(GlobalContext);

  const onSubmitEventHandler = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('Email dan password harus diisi!');
      return;
    }

    setIsLoading(true);
    try {
      const { error, data } = await login({ email, password });

      if (!error) {
        putAccessToken(data.accessToken);
        const { data: user } = await getUserLogged();
        setAuthedUser(user);
        navigate('/');
      } else {
        throw new Error('Login gagal! Periksa kembali email dan password Anda.');
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader theme={theme} />;
  }

  return (
    <>
      <h2>
        {locale === 'id'
          ? 'Yuk, login untuk menggunakan aplikasi.'
          : "Let's login to use the application."}
      </h2>
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
        <button
          type='submit'
          disabled={isLoading}
        >
          Login
        </button>
      </form>
      <p>
        {locale === 'id' ? 'Belum punya akun?' : "Don't have an account?"}{' '}
        <Link to='/register'>{locale === 'id' ? 'Daftar di sini' : 'Sign up here'}</Link>
      </p>
    </>
  );
}

export default LoginPage;
