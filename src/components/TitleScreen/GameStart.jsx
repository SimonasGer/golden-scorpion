import { Link } from "react-router-dom"
import "./gameStart.scss";
export const GameStart = () => {
    return (
        <div className="game-start">
            <h1 className="game-title">Welcome to Golden Scorpion!</h1>
            <p className="game-subtitle">Get ready to embark on an exciting adventure.</p>
            <div className="game-actions">
                <Link className="game-link" to={"/login"}>Log In</Link>
                <Link className="game-link" to={"/register"}>Register</Link>
            </div>
        </div>
    )
}