import React, { useEffect, useState } from 'react'
import loginHistoryService from '../services/loginHistoryService';

function AdminPage() {
  const [loginHistory, setLoginHistory] = useState([])

  // Lấy tất cả lịch sử đăng nhập khi component được load
  useEffect(() => {
    loginHistoryService.getAll().then(data => {
      // Chuyển đổi dữ liệu thành định dạng ngày/tháng/năm và giờ
      const formattedData = data.map(entry => ({
        loginId: entry.login_id,
        app: entry.app,
        date: new Date(entry.last_login).toLocaleDateString(),
        time: new Date(entry.last_login).toLocaleTimeString()
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
    </main>
  )
}

export default AdminPage
