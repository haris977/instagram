import './App.css'
import Navbar from './pages/Navbar'
import Notification from './pages/Notification'
import Home from './pages/Home'
import Follower from './pages/Follower'
import { Routes, Route } from 'react-router-dom'
import Message from './pages/Message'
import Profile from './pages/Profile'
import Footer from './pages/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/message" element={<Message />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/follow" element={<Follower />} />
      </Routes>
      <div className='absolute bottom-0 w-screen flex justify-center bg-gray-900 text-white'>

      <Footer />
      </div>
    </>
  )
}

export default App
