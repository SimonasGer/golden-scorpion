import axios from "axios"
import { useState } from "react";

export const MissionCard = (props) => {
    const [accepted, setAccepted] = useState(false);
    const handleAccept = async () => {
        try {
            setAccepted(true);
            const token = localStorage.getItem("token")
            await axios.post("http://localhost:8080/missions", props,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        } catch (err) {
            console.error("Failed to accept mission:", err)
        }
    }

    return (
        <div className="merc-card">
            <h3 className="merc-name">{props.name}</h3>
            <div className="merc-stats">
                <p>Strength: {props.stats.strength}</p>
                <p>Agility: {props.stats.agility}</p>
                <p>Intelligence: {props.stats.intelligence}</p>
            </div>
            <p>Reward: {props.reward}</p>
            <p className="merc-description">Description: {props.description}</p>
            <button className="action-button" onClick={handleAccept} disabled={accepted}>Accept</button>
        </div>
    )
}