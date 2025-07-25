import axios from "axios"
import { useState } from "react";

export const MissionLogCard = (props) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [disabled, setDisabled] = useState(false);

    const handleScrub = async () => {
        try {
            const token = localStorage.getItem("token")
            await axios.delete(`${apiUrl}/missions/${props.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setDisabled(true);
        } catch (err) {
            console.error("Failed to scrub mission:", err)
        }
    }

    return (
        <div className={`merc-card mission-${props.status}`}>
            <h3 className="merc-name">{props.name}</h3>
            <div className="merc-stats">
                <p>Strength: {props.strength}</p>
                <p>Agility: {props.agility}</p>
                <p>Intelligence: {props.intelligence}</p>
            </div>
            <p>Status: {props.status}</p>
            <p>Reward: {props.reward}</p>
            <p className="merc-description">Description: {props.description}</p>
            <p className="merc-sent">Sent Mercenaries: Dont worry about it</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button disabled={disabled} className="action-button" onClick={handleScrub}>Scrub mission from records</button>
            </div>
        </div>
    )
}