import { Route, Routes } from 'react-router'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { CreateMangas } from './pages/Admin/AddManga';
import { Home } from './pages/Home/Home';
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
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

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/panel' element={
          <ProtectedRoute isAuthenticated={user?.role === 'admin'}>
            <CreateMangas />
          </ProtectedRoute>
        } />
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
