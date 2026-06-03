import { Link, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getUserLogged } from './utils/network-data';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import AddNotePage from './pages/AddNotePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function fetchAuthedUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }

    fetchAuthedUser();
  }, []);

  // TODO: ADD LOADING INDICATOR
  return initializing ? null : (
    <div className='app-container'>
      <header>
        <h1>
          <Link to='/'>Aplikasi Catatan</Link>
        </h1>
        <div className='navigation'>
          <ul>
            {authedUser && (
              <li>
                <Link to='/archives'>Arsip</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
      <main>
        <Routes>
          {!authedUser ? (
            <>
              <Route
                path='/register'
                element={<RegisterPage />}
              />
              <Route
                path='/*'
                element={<LoginPage />}
              />
            </>
          ) : (
            <>
              <Route
                path='/'
                element={<HomePage />}
              />
              <Route
                path='/archives'
                element={<HomePage archived />}
              />
              <Route
                path='/notes/new'
                element={<AddNotePage />}
              />
              <Route
                path='/notes/:id'
                element={<DetailPage />}
              />
              <Route
                path='*'
                element={<NotFoundPage />}
              />
            </>
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
