import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import logo from '../assets/logo.png'
import logo_dark from '../assets/logo_dark.png'
import './Header.css'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const location = useLocation()
  const { theme, toggleTheme } = useContext(ThemeContext)
  const path = location.pathname

  let headerTitle = 'Minced Corp'

  if (path.startsWith('/minced-meat-app')) {
    headerTitle = 'Minced Meat App'
  } else if (path.startsWith('/baker-blade-app')) {
    headerTitle = 'Baker Blade App'
  } else if (path.startsWith('/diet-coke-app')) {
    headerTitle = 'Diet Coke App'
  }

  return (
    <header className="header">
      <div className="logo-container">
        <img 
          src={theme === 'light' ? logo : logo_dark} 
          alt="Logo" 
          className="logo" 
        />
        <span className="header-title">{headerTitle}</span>
      </div>

      <div className="header-actions">
        <button className="logout-button">Log out</button>
        <FontAwesomeIcon
          icon={theme === 'light' ? faMoon : faSun}
          className="theme-icon"
          onClick={toggleTheme}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        />
      </div>
    </header>
  )
}

export default Header
