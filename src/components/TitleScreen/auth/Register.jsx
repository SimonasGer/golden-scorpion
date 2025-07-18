import { Link } from "react-router-dom"
export const Register = () => {
    return (
        <form>
            <h2>Register</h2>
            <fieldset>
                <input type="email" placeholder="email"/>
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <input type="password" placeholder="repeat password"/>
                <Link to={"/game"}>Register</Link>
            </fieldset>
        </form>
    )
}