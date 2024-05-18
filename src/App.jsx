import { useState } from 'react'
import './App.css'
import Home from './components/Pages/Home'
import Menu from './components/Pages/Menu'
// import Quiz from './components/Pages/Quiz'
import { Route, Router, Routes } from 'react-router-dom'

import Detail from './components/Pages/Detail'
import Profile from './components/Pages/Profile'

import Login from './components/Pages/Login'
import Register from './components/Pages/Register'
import { QueryClient, QueryClientProvider } from 'react-query'
import Coba from './components/Pages/coba'
import Paket from './components/Pages/Paket'
import Meal from './components/Pages/Meal-planning'
import Quiz from './components/Pages/Quiz'
import About from './components/Pages/About'

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()

  return (
    <>
      <div>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/meal" element={<Meal />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/paket" element={<Paket />} />
            <Route path="/paket/:selectedDay/:paketName" element={<Paket />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/detail/:idDetail/:kalori/:berat/:selectedDay/:paketName" element={<Detail />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/registrasi" element={<Register />} />
            <Route path="/coba" element={<Coba />} />

          </Routes>
        </QueryClientProvider>
      </div>
    </>
  )
}

export default App
