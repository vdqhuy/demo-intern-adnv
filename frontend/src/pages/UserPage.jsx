import React, { useEffect, useState } from 'react'
import loginHistoryService from '.././services/loginHistoryService';
import axios from 'axios';

function UserPage() {
  // Dữ liệu giả lập về lịch sử đăng nhập
  // const loginHistory = [
  //   { app: 'Minced Meat App', date: '2025-04-26', time: '10:30 AM' },
  //   { app: 'Diet Coke App', date: '2025-04-25', time: '08:45 PM' },
  //   { app: 'Minced Meat App', date: '2025-04-24', time: '12:00 PM' }
  // ]

  const [loginHistory, setLoginHistory] = useState([])
  const [loginId, setLoginId] = useState('');
  // const loginId = 'user1' // mặc định

  // Lấy loginId khi component load
  useEffect(() => {
    axios.get('http://localhost:3000/api/me', { withCredentials: true })
      .then(response => {
        setLoginId(response.data.loginId); // ✅ Lấy loginId từ token đã decode ở backend
      })
      .catch(error => {
        console.error('Lỗi lấy user info:', error);
      });
  }, []);

  useEffect(() => {
    if (loginId) {
        loginHistoryService.getByLoginId(loginId).then(data => {
          // Chuyển đổi dữ liệu thành định dạng ngày/tháng/năm và giờ
          const formattedData = data.map(entry => ({
            app: entry.app,
            date: new Date(entry.last_login).toLocaleDateString(),
            time: new Date(entry.last_login).toLocaleTimeString()
    
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
  )
}

export default UserPage
