import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import UserPage from './pages/UserPage'

function App() {
  return (
    <Router basename="/minced-meat">
      <div className="app">
        <Header />

        <Routes>
          <Route path="*" element={<UserPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
