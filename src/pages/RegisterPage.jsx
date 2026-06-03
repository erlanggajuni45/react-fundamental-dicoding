import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function RegisterPage() {
  const { locale } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const onSubmitEventHandler = async (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert(locale === 'id' ? 'Semua field harus diisi!' : 'All fields must be filled!');
      return;
    }

    if (password.length < 6) {
      alert(
        locale === 'id'
          ? 'Password harus memiliki panjang minimal 6 karakter!'
          : 'Password must have a minimum length of 6 characters!',
      );
      return;
    }

    if (password !== confirmPassword) {
      alert(
        locale === 'id'
          ? 'Password dan konfirmasi password tidak cocok!'
          : 'Password and confirm password do not match!',
      );
      return;
    }

    const { error } = await register({ name, email, password });

    if (!error) {
      alert(
        locale === 'id'
          ? 'Registrasi berhasil! Silakan login untuk melanjutkan.'
          : 'Registration successful! Please login to continue.',
      );
      navigate('/');
    }
  };

  return (
    <div>
      <h2>
        {locale === 'id'
          ? 'Isi form untuk mendaftar akun.'
          : 'Fill out the form to register an account.'}
      </h2>

      <form
        className='input-register'
        onSubmit={onSubmitEventHandler}
      >
        <label htmlFor='name'>{locale === 'id' ? 'Nama' : 'Name'}</label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={onNameChange}
        />
        <label htmlFor='email'>{locale === 'id' ? 'Email' : 'Email'}</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={onEmailChange}
        />
        <label htmlFor='password'>{locale === 'id' ? 'Password' : 'Password'}</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={onPasswordChange}
        />
        <label htmlFor='confirmPassword'>
          {locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}
        </label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        <button type='submit'>{locale === 'id' ? 'Daftar' : 'Register'}</button>
      </form>

      <p>
        {locale === 'id' ? 'Sudah punya akun? ' : 'Already have an account? '}
        <Link to='/login'>{locale === 'id' ? 'Login di sini' : 'Login here'}</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
