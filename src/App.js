import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from '@vercel/analytics/react';
import { jwtDecode } from "jwt-decode";
import { GameStart } from "./components/TitleScreen/GameStart";
import { MainMenu } from "./components/Game/MainMenu";
import { Login } from "./components/TitleScreen/auth/Login";
import { Register } from "./components/TitleScreen/auth/Register";
import { HireMercs } from "./components/Game/hire/HireMercs";
import { OwnedMercs } from "./components/Game/owned/OwnedMercs";
import { GeneratedMissions } from "./components/Game/missions/GeneratedMissions";
import { AcceptedMissions } from "./components/Game/missions/AcceptedMissions";
import { MissionPage } from "./components/Game/missions/MissionPage";
import { MissionLog } from "./components/Game/missions/MissionLog";

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
          <Route
            path="/mercs/hire"
            element={
              <ProtectedRoute>
                <HireMercs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mercs/owned"
            element={
              <ProtectedRoute>
                <OwnedMercs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/missions/generated"
            element={
              <ProtectedRoute>
                <GeneratedMissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/missions/accepted"
            element={
              <ProtectedRoute>
                <AcceptedMissions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/missions/:id"
            element={
              <ProtectedRoute>
                <MissionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/missions/log"
            element={
              <ProtectedRoute>
                <MissionLog />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<Navigate to="/" />}
          />
        </Routes>
      </Router>
      <Analytics />
    </div>
  );
}

export default App;
