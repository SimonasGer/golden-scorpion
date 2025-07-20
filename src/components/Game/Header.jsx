import { Link } from "react-router-dom"
import { Logout } from "../TitleScreen/auth/Logout"

export const Header = () => {
    return (
        <header className="game-header">
            <h1>Golden Scorpion</h1>
            <nav>
                <Link to="/game">Main Menu</Link>
                <Link to="/profile">Profile</Link>
                <Logout/>
            </nav>
        </header>
    )
}