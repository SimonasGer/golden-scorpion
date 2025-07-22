import { useNavigate } from "react-router-dom";
import "./auth.scss";

export const Logout = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/")
    }
    return(
        <button className="auth-button" onClick={handleLogout}>Log Out</button>
    )
}