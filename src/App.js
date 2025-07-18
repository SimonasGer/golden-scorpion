import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GameStart } from "./components/TitleScreen/GameStart";
import { MainMenu } from "./components/Game/MainMenu";
import { Login } from "./components/TitleScreen/auth/Login";
import { Register } from "./components/TitleScreen/auth/Register";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/" />;
}

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/game" /> : children;
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
