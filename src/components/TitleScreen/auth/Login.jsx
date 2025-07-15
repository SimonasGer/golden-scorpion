import { Link } from "react-router-dom"
export const Login = () => {
    return (
        <form>
            <h2>Login</h2>
            <fieldset>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <Link to={"/game"}>Log In</Link>
            </fieldset>
        </form>
    )
}