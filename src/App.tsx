import { Route, Routes } from 'react-router'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { Flex } from './components/Flex'
import Home from './components/Home/Home';
import Login from './components/Login'
import { useAuth } from './providers/auth';

export type ProtectedRouteProps = {
  isAuthenticated?: boolean;
  children: React.ReactElement;
}

export const ProtectedRoute = ({
  isAuthenticated = false,
  children
}: ProtectedRouteProps): JSX.Element => {
  if (isAuthenticated) {
    return children
  }
  return <Navigate to='/' />
}


function App() {
  const { user } = useAuth()

  console.log(user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={
          <ProtectedRoute isAuthenticated={!!user}>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
