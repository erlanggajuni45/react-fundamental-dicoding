import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <div className='app-container'>
      <header>
        <h1>
          <Link to='/'>Aplikasi Catatan</Link>
        </h1>
        <div className='navigation'>
          <ul>
            <li>
              <Link to='/archives'>Arsip</Link>
            </li>
          </ul>
        </div>
      </header>
      <main>
        <Routes>
          <Route
            path='/'
            element={<HomePage />}
          />
          <Route
            path='/notes/:id'
            element={<DetailPage />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
