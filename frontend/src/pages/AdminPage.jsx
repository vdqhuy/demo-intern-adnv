import React, { useEffect, useState } from 'react'

function AdminPage() {
  const [loginHistory, setLoginHistory] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/histories') // Gọi toàn bộ lịch sử
        const data = await res.json()

        const formatted = data.map(entry => {
          const dateObj = new Date(entry.last_login)
          const date = dateObj.toLocaleDateString('en-CA') // yyyy-mm-dd
          const time = dateObj.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })

          return {
            loginId: entry.User?.login_id || 'Unknown',
            app: 'Unknown',
            date,
            time
          }
        })

        setLoginHistory(formatted)
      } catch (err) {
        console.error('Failed to fetch login history:', err)
      }
    }

    fetchData()
  }, [])

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
