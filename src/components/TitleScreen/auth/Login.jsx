import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./auth.scss";

export const Login = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [error, setError] = useState("")

    const handleChange = (e) => {
        setFormData({ ...formData, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        try {
        const res = await axios.post(`${apiUrl}/users/login`, {
            email: formData.email,
            password: formData.password,
        })
        localStorage.setItem("token", res.data.data.token)
        console.log(res.data.data.token)
        navigate("/game")
        } catch (err) {
        console.error(err)
        setError(err.response?.data?.message || "Something went wrong.")
        }
    }
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-title">Login</h2>
            <fieldset className="auth-fieldset">
                <input className="auth-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input className="auth-input" type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} required />
                <button className="auth-button" type="submit">Log In</button>
                <Link to="/register" className="auth-link">Don't have an account?</Link>
                {error && <p className="auth-error">{error}</p>}
            </fieldset>
        </form>
    )
}