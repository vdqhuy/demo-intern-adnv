import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'
import logo from '../assets/logo.png'
import logo_dark from '../assets/logo_dark.png'
import './Header.css'

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const headerTitle = import.meta.env.VITE_HEADER_TITLE || 'IAM Intern Corp'
  const basePath = import.meta.env.VITE_BASE_PATH;

  // Hàm để xử lý đăng xuất
  const handleLogout = () => {
    window.location.href = `${window.location.origin}${basePath}/?logout`;
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
        <button className="logout-button" onClick={handleLogout}>Log out</button>
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
