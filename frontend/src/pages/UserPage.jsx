import React, { useEffect, useState } from 'react'

function UserPage() {
  // Dữ liệu giả lập về lịch sử đăng nhập
  // const loginHistory = [
  //   { app: 'Minced Meat App', date: '2025-04-26', time: '10:30 AM' },
  //   { app: 'Diet Coke App', date: '2025-04-25', time: '08:45 PM' },
  //   { app: 'Minced Meat App', date: '2025-04-24', time: '12:00 PM' }
  // ]

  const [loginHistory, setLoginHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loginId = 'huy123' // mặc định

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/histories/loginId/huy123')
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
