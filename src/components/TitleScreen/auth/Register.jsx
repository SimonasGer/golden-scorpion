import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
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
        const res = await axios.post("http://localhost:8080/users/register", {
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
        <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <fieldset>
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            <button type="submit">Register</button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </fieldset>
        </form>
    )
}
