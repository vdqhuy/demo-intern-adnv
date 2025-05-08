import React, { useEffect, useState } from 'react';
import loginHistoryService from '.././services/loginHistoryService';
import axios from 'axios';

function UserPage() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // State for login history data
  const [loginHistory, setLoginHistory] = useState([]);
  const [loginId, setLoginId] = useState('');

  // Fetch loginId when component loads
  // https://iamintern.adnovumlabs.com/minced-meat-backend/api/me
  useEffect(() => {
    axios.get(`${backendUrl}/me`, { withCredentials: true })
      .then(response => {
        setLoginId(response.data.loginId); // ✅ Get loginId from decoded token in backend
      })
      .catch(error => {
        console.error('Failed to fetch user info:', error);
      });
  }, []);

  useEffect(() => {
    if (loginId) {
      loginHistoryService.getByLoginId(loginId).then(data => {
        // Format data into date/month/year and time format
        const formattedData = data.map(entry => ({
          app: entry.app,
          date: new Date(entry.time).toLocaleDateString(),
          time: new Date(entry.time).toLocaleTimeString()
        }));
        setLoginHistory(formattedData);
      });
    }
  }, [loginId]);

  return (
    <main className="main">
      <h1>Welcome {loginId}</h1>
      <p>Your recent login history across this domain:</p>

      <table>
        <thead>
          <tr>
            <th>App</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {loginHistory.map((entry, index) => (
            <tr key={index}>
              <td>{entry.app}</td>
              <td>{entry.date}</td>
              <td>{entry.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default UserPage;
