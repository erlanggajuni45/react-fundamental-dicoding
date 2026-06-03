import { useContext, useEffect } from 'react';
import { Languages, LogOut, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';

function Navigation() {
  const { authedUser, setAuthedUser, theme, setTheme } = useContext(GlobalContext);

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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <header>
      <h1>
        <Link to='/'>Aplikasi Catatan</Link>
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
            <button className='toggle-locale'>
              <Languages />
            </button>
          </li>

          {authedUser && (
            <>
              <li>
                <Link to='/archives'>Arsip</Link>
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
