import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./auth.scss";

export const Register = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
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

        if (formData.password !== formData.confirmPassword) {
        return setError("Passwords do not match.")
        }

        try {
        const res = await axios.post(`${apiUrl}/users/register`, {
            email: formData.email,
            username: formData.username,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
        })
        localStorage.setItem("token", res.data.token)
        navigate("/game")
        } catch (err) {
        console.error(err)
        setError(err.response?.data?.message || "Something went wrong.")
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-title">Register</h2>
            <fieldset className="auth-fieldset">
                <input className="auth-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input className="auth-input" type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input className="auth-input" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <input className="auth-input" type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                <button className="auth-button" type="submit">Register</button>
                <Link to="/login" className="auth-link">Already have an account?</Link>
                {error && <p className="auth-button">{error}</p>}
            </fieldset>
        </form>
    )
}
