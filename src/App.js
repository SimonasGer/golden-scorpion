import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GameStart } from "./components/GameStart";
import { MainMenu } from "./components/MainMenu";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<GameStart/>}/>
          <Route path="/game" element={<MainMenu/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
