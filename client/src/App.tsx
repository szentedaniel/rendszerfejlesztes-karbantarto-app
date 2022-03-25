import { Button, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import axios from 'axios'
import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'

function App() {

  axios.defaults.baseURL = 'http://localhost:8000/api'
  const [user, setUser] = useLocalStorage<UserState>({ key: 'user' });


  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={(user.id) ? <Dashboard /> : <Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<Login />} />
          <Route path="/room/:code" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
