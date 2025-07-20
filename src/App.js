import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { GameStart } from "./components/TitleScreen/GameStart";
import { MainMenu } from "./components/Game/MainMenu";
import { Login } from "./components/TitleScreen/auth/Login";
import { Register } from "./components/TitleScreen/auth/Register";

const isTokenValid = (token) => {
  try {
    const decoded = jwtDecode(token)
    const now = Date.now() / 1000
    const valid = decoded.exp && decoded.exp > now
    if (!valid) {
      localStorage.removeItem("token")
    }
    return valid
  } catch (e) {
    localStorage.removeItem("token")
    return false
  }
}


const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token && isTokenValid(token) ? children : <Navigate to="/"/>;
}

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token && isTokenValid(token) ? <Navigate to="/game"/> : children;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <GameStart />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
          path="/game"
          element={
            <ProtectedRoute>
              <MainMenu />
            </ProtectedRoute>
          }
        />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
