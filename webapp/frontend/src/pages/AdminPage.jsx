import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loginHistoryService from '../services/loginHistoryService';
import axios from 'axios';

function AdminPage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [loginHistory, setLoginHistory] = useState([]);
  const [loginId, setLoginId] = useState('');

  const fetchLoginHistory = async () => {
    try {
      const data = await loginHistoryService.getTodayHistory();
      const formattedData = data.map(entry => ({
        loginId: entry.login_id,
        app: entry.app,
        date: new Date(entry.time).toLocaleDateString(),
        time: new Date(entry.time).toLocaleTimeString()
      }));
      setLoginHistory(formattedData);
    } catch (error) {
      console.error('Failed to fetch login history:', error);
    }
  };

  useEffect(() => {
    axios.get(`${backendUrl}/me`, { withCredentials: true })
      .then(response => {
        setLoginId(response.data.loginId); // ✅ Get loginId from decoded token in backend
        fetchLoginHistory();
      })
      .catch(error => {
        console.error('Failed to fetch user info:', error);
      });
  }, []);

  // Fetch all login history when the component is loaded
  useEffect(() => {
    loginHistoryService.getTodayHistory().then(data => {
      // Format data into date/month/year and time format
      const formattedData = data.map(entry => ({
        loginId: entry.login_id,
        app: entry.app,
        date: new Date(entry.time).toLocaleDateString(),
        time: new Date(entry.time).toLocaleTimeString()
      }));
      setLoginHistory(formattedData);
    });
  }, []);

  return (
    <main className="main">
      <h1>Admin Dashboard</h1>
      <h2>Welcome {loginId}</h2>
      <p style={{ marginBottom: '3rem' }}>Recent login history across all users:</p>

      <div style={{ 
            maxHeight: '512px', 
            overflowY: 'auto',
            width: '80%',
            margin: '0 auto',
          }}
          className="scroll-box">
        <table>
          <thead>
            <tr>
              <th>Login ID</th>
              <th>App</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {loginHistory.map((entry, index) => (
              <tr key={index}>
                <td>{entry.loginId}</td>
                <td>{entry.app}</td>
                <td>{entry.date}</td>
                <td>{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <button
          className='gen-button'
          onClick={() => window.open('http://iamgrafana.adnovumlabs.com/public-dashboards/284d423dd7a44dc180ef021ea8e5e605?from=now-1h&to=now&timezone=browser&refresh=30s', '_blank')}
          >
          Login History Dashboard
        </button>
      </div>
    </main>
  )
}

export default AdminPage
