import { MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import axios from 'axios'
import { useRoutes } from 'react-router-dom'

import routerConfig from './Config/routerConfig'

import { UserState } from './types'




function App() {
  const routes = useRoutes(routerConfig)
  axios.defaults.baseURL = 'http://localhost:8000/api'
  const [user, setUser] = useLocalStorage<UserState>({ key: 'user' });




  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>
      {routes}
    </MantineProvider>
  )
}

export default App
