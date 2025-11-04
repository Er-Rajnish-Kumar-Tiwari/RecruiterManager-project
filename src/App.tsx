import { useState } from 'react'
import RecruiterDashboard from './pages/RecruiterDashboard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RecruiterDashboard />
    </>
  )
}

export default App
