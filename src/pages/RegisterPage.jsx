import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';

function RegisterPage() {
  const navigate = useNavigate();

  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

  const onSubmitEventHandler = async (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert('Semua field harus diisi!');
      return;
    }

    if (password.length < 6) {
      alert('Password harus memiliki panjang minimal 6 karakter!');
      return;
    }

    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!');
      return;
    }

    const { error } = await register({ name, email, password });

    if (!error) {
      alert('Registrasi berhasil! Silakan login untuk melanjutkan.');
      navigate('/');
    }
  };

  return (
    <div>
      <h2>Isi form untuk mendaftar akun.</h2>

      <form
        className='input-register'
        onSubmit={onSubmitEventHandler}
      >
        <label htmlFor='name'>Nama</label>
        <input
          type='text'
          id='name'
          name='name'
          value={name}
          onChange={onNameChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          value={email}
          onChange={onEmailChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          value={password}
          onChange={onPasswordChange}
        />
        <label htmlFor='confirmPassword'>Konfirmasi Password</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
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
