import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { doc, getDoc, } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Route, Routes } from 'react-router'
import { BrowserRouter, Navigate } from 'react-router-dom'
import { CreateMangas } from './pages/Admin/AddManga';
import { Home } from './pages/Home/Home';
import Login from './pages/Login/Login'
import { MangaList } from './pages/MangaList/MangaList';
import Signup from './pages/Signup/Signup';
import { auth, db } from './utils/firebaseUtils';

export type ProtectedRouteProps = {
  isAuthenticated?: boolean;
  children: React.ReactElement;
  loading: boolean;
  redirect?: string;
}

export const ProtectedRoute = ({
  isAuthenticated = false,
  loading,
  redirect = '/',
  children
}: ProtectedRouteProps): JSX.Element => {
  if (loading) return <CircularProgress style={{ position: 'absolute', top: 'calc(50% - 50px)', left: 'calc(50% - 50px)' }} size='100px' />
  return !loading && isAuthenticated ? children : <Navigate to={redirect} />
}

const theme = createTheme({
  typography: {
    fontFamily:
      'Rubik'
  }
})

function App() {
  const [user, loading] = useAuthState(auth)
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    const transactionsRef = doc(db, `users/${user?.uid}`);
    const docSnap = getDoc(transactionsRef);
    docSnap.then((value) => {
      setAdmin(value.get('role') === 'admin')
    }
    )
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute isAuthenticated={!user} redirect='/home' loading={loading}>
              <Login />
            </ProtectedRoute>} />
          <Route path='/signup' element={
            <ProtectedRoute isAuthenticated={!user} redirect='/home' loading={loading}>
              <Signup />
            </ProtectedRoute>} />
          <Route path='/panel' element={
            <ProtectedRoute isAuthenticated={isAdmin} redirect={!!user ? '/home' : '/'} loading={loading}>
              <CreateMangas />
            </ProtectedRoute>
          } />
          <Route path='/home' element={
            <ProtectedRoute loading={loading} isAuthenticated={!!user}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/mangas-list' element={
            <ProtectedRoute loading={loading} isAuthenticated={!!user}>
              <MangaList />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
