import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<UserPage />} />
          <Route path="/minced-meat-app" element={<UserPage />} />
          <Route path="/baker-blade-app" element={<UserPage />} />
          {/* <Route path="/diet-coke-app" element={<AdminPage />} /> */}
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
