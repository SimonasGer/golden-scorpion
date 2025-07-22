import { Link } from "react-router-dom"
import { Logout } from "../TitleScreen/auth/Logout"
import "./header.scss";

export const Header = () => {
    return (
        <header className="header">
            <h1 className="header-title">Golden Scorpion</h1>
            <nav className="header-nav">
                <Link to="/game" className="header-link">Main Menu</Link>
                <Link to="/mercs/owned" className="header-link">Owned mercenaries</Link>
                <Link to="/mercs/hire" className="header-link">Hire mercenaries</Link>
                <Link to="/missions/generated" className="header-link">Missions</Link>
                <Link to="/missions/accepted" className="header-link">Accepted missions</Link>
                <Logout className="header-link" />
            </nav>
        </header>
    )
}