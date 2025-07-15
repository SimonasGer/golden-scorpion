import { Login } from "./auth/Login"
export const GameStart = () => {
    return (
        <div className="game-start">
            <h1>Welcome to Golden Scorpion!</h1>
            <p>Get ready to embark on an exciting adventure.</p>
            <Login/>
        </div>
    )
}