import { Route, Routes } from 'react-router-dom'
import ChatPage from './pages/ChatPage'
import Landing from './pages/Landing'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/phan-tich" element={<ChatPage />} />
    </Routes>
  )
}

export default App
