import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons'

function Footer() {
    return (
      <footer className="footer">
        <p>© {new Date().getFullYear()} Made with <FontAwesomeIcon icon={faFire} /> by IAM Intern team</p>
      </footer>
    )
  }
  
  export default Footer
  