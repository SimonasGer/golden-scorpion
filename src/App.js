import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameStart } from "./components/TitleScreen/GameStart";
import { MainMenu } from "./components/Game/MainMenu";
import { Login } from "./components/TitleScreen/auth/Login";
import { Register } from "./components/TitleScreen/auth/Register";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<GameStart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/game" element={<MainMenu/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
