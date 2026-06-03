import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import { getUserLogged } from './utils/network-data';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import NotFoundPage from './pages/NotFoundPage';
import AddNotePage from './pages/AddNotePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import GlobalContext from './context/GlobalContext';
import Navigation from './components/Navigation';
import Loader from './components/Loader';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [initializing, setInitializing] = useState(true);
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');

  const globalContextValue = useMemo(() => {
    return {
      authedUser,
      setAuthedUser,
      theme,
      setTheme,
      locale,
      setLocale,
    };
  }, [authedUser, theme, locale]);

  useEffect(() => {
    async function fetchAuthedUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }

    fetchAuthedUser();

    return () => {
      setAuthedUser(null);
      setInitializing(true);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  return initializing ? (
    <Loader theme={theme} />
  ) : (
    <GlobalContext.Provider value={globalContextValue}>
      <div className='app-container'>
        <Navigation />
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
    </GlobalContext.Provider>
  );
}

export default App;
