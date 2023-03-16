import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router";
import { BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Panel } from "./pages/Admin";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup/Signup";
import { UserProvider } from "./provider/userProvider";
import { auth, db } from "./utils/firebaseUtils";
import "react-toastify/dist/ReactToastify.css";
import { Mangas } from "./pages/Mangas";

export type ProtectedRouteProps = {
  isAuthenticated?: boolean;
  children: React.ReactElement;
  loading: boolean;
  redirect?: string;
};

export const ProtectedRoute = ({
  isAuthenticated = false,
  loading,
  redirect = "/",
  children,
}: ProtectedRouteProps): JSX.Element => {
  if (loading)
    return (
      <CircularProgress
        style={{
          position: "absolute",
          top: "calc(50% - 50px)",
          left: "calc(50% - 50px)",
        }}
        size="100px"
      />
    );
  return !loading && isAuthenticated ? children : <Navigate to={redirect} />;
};

const theme = createTheme({
  typography: {
    fontFamily: "Rubik",
  },
});

function App() {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    const transactionsRef = doc(db, `users/${user?.uid}`);
    const docSnap = getDoc(transactionsRef);
    docSnap.then((value) => {
      setAdmin(value.get("role") === "admin");
    });
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer theme="dark" limit={5} />
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isAuthenticated={!user}
                  redirect="/home"
                  loading={loading}
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedRoute
                  isAuthenticated={!user}
                  redirect="/home"
                  loading={loading}
                >
                  <Signup />
                </ProtectedRoute>
              }
            />
            <Route
              path="/panel"
              element={
                <ProtectedRoute
                  isAuthenticated={!!isAdmin}
                  redirect={!!user ? "/home" : "/"}
                  loading={loading}
                >
                  <Panel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute loading={loading} isAuthenticated={!!user}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mangas-list"
              element={
                <ProtectedRoute loading={loading} isAuthenticated={!!user}>
                  <Mangas />
                </ProtectedRoute>
              }
            />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
