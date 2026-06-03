function LoginPage() {
  return (
    <>
      <h2>Yuk, login untuk menggunakan aplikasi.</h2>
      <form className='input-login'>
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
        <button type='submit'>Login</button>
      </form>
    </>
  );
}

export default LoginPage;
