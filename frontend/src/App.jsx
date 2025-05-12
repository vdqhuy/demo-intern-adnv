import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage';
import MetricView from './pages/MetricView';
import OtherChartView from './pages/OtherChartView';

function App() {
  const basePath = import.meta.env.VITE_BASE_PATH || '/iam-intern-corp/'

  return (
    <Router basename={basePath}>
      <div className="app">
        <Header />

        <Routes>
          <Route path="*" element={<UserPage />} />
          {/* <Route path="/" element={<AdminPage />} />
          <Route path="/metrics" element={<MetricView />} />
          <Route path="/other-charts" element={<OtherChartView />} />
          <Route path="*" element={<AdminPage />} /> */}
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
