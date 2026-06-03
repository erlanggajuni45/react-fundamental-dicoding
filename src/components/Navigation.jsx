import { useContext, useEffect } from 'react';
import { Languages, LogOut, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

function Navigation() {
  const { authedUser, setAuthedUser, theme, setTheme, setLocale, locale } =
    useContext(GlobalContext);

  const logout = () => {
    localStorage.removeItem('accessToken');
    setAuthedUser(null);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  return (
    <header>
      <h1>
        <Link to='/'>{locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
      </h1>

      <nav className='navigation'>
        <ul>
          <li>
            <button
              className='toggle-theme'
              onClick={toggleTheme}
            >
              {theme === 'light' ? <Moon /> : <Sun />}
            </button>
          </li>
          <li>
            <button
              className='toggle-locale'
              onClick={toggleLocale}
            >
              <Languages />
            </button>
          </li>

          {authedUser && (
            <>
              <li>
                <Link to='/archives'>{locale === 'id' ? 'Terarsip' : 'Archived'}</Link>
              </li>
              <li>
                <button
                  className='button-logout'
                  onClick={logout}
                >
                  <LogOut /> {authedUser.name}
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
