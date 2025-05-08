import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loginHistoryService from '../services/loginHistoryService';
import axios from 'axios';

function AdminPage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();

  const [loginHistory, setLoginHistory] = useState([]);
  const [loginId, setLoginId] = useState('');

  useEffect(() => {
    axios.get(`${backendUrl}/me`, { withCredentials: true })
      .then(response => {
        setLoginId(response.data.loginId); // ✅ Get loginId from decoded token in backend
      })
      .catch(error => {
        console.error('Failed to fetch user info:', error);
      });
  }, []);

  // Fetch all login history when the component is loaded
  useEffect(() => {
    loginHistoryService.getAll().then(data => {
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
      <p>Recent login history across all users:</p>

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

      <div>
        <button className='gen-button' onClick={() => navigate('/metrics')} style={{ marginRight: '100px' }}>
          View Metrics
        </button>
        <button className='gen-button' onClick={() => navigate('/other-charts')}>
          View Other Charts
        </button>
      </div>
    </main>
  )
}

export default AdminPage
