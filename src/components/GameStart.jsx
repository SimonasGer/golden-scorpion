import { Link } from "react-router-dom"
export const GameStart = () => {
    return (
        <div className="game-start">
            <h1>Welcome to Golden Scorpion!</h1>
            <p>Get ready to embark on an exciting adventure.</p>
            <Link to="/game" className="start-button">Start Game</Link>
        </div>
    )
}