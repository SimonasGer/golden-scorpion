import { Link } from "react-router-dom"
export const GameStart = () => {
    return (
        <div className="game-start">
            <h1>Welcome to Golden Scorpion!</h1>
            <p>Get ready to embark on an exciting adventure.</p>
            <Link to={"/login"}>Log In</Link>
            <Link to={"/register"}>Register</Link>
        </div>
    )
}