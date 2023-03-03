import { CircularProgress } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { CreateMangas } from './pages/Admin/AddManga';
import { Home } from './pages/Home/Home';
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
import { auth } from './utils/firebaseUtils';

export type ProtectedRouteProps = {
  isAuthenticated?: boolean;
  children: React.ReactElement;
  loading: boolean;
}

export const ProtectedRoute = ({
  isAuthenticated = false,
  loading,
  children
}: ProtectedRouteProps): JSX.Element => {
  if (loading) return <CircularProgress style={{ position: 'absolute', top: 'calc(50% - 50px)', left: 'calc(50% - 50px)' }} size='100px' />
  return !loading && isAuthenticated ? children : <Navigate to='/' />
}


function App() {
  const [user, loading] = useAuthState(auth)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/panel' element={
          <ProtectedRoute isAuthenticated={!!user} loading={loading}>
            <CreateMangas />
          </ProtectedRoute>
        } />
        <Route path='/home' element={
          <ProtectedRoute loading={loading} isAuthenticated={!!user}>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
