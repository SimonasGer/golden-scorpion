import { Header } from "./Header"
import axios from "axios"

export const MainMenu = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleRestart = async () => {
        try {
            const token = localStorage.getItem("token")
            await axios.post(`${apiUrl}/users/reset`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            window.location.reload() // Reload to reset the app state
        } catch (err) {
            console.error("Failed to restart the game:", err)
        }
    }

    return (
        <div className="main-menu">
            <Header/>
            <section className="tutorial-section">
                <h2 className="section-title">Tutorial</h2>
                <article className="tutorial-text">
                    Welcome to <strong>Golden Scorpion</strong>, commander. <br/><br/>
                    You run a dying mercenary company in the middle of nowhere. Your gold is low. Your men are worse. Here's what you need to know:
                    <ul>
                        <li><strong>Hire mercs</strong>. Each one has unique stats and traits. Some are barely human.</li>
                        <li><strong>Send them on missions</strong>. Choose carefully, missions have stat requirements.</li>
                        <li><strong>Mercs can get injured or die.</strong> Injured ones can be healed for a price. Dead ones... well, you can bury them.</li>
                        <li><strong>Gold is everything.</strong> You earn it by completing missions, but each merc has a wage. Plan ahead or go broke.</li>
                    </ul>
                    You can access all systems from the top of the screen. Good luck, boss. You'll need it.
                </article>
                <div>
                    <button onClick={handleRestart} className="action-link">RESTART SAVE</button>
                </div>
            </section>
        </div>
    )
}