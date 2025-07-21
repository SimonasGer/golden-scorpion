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
        <div className="mission-card">
            <h3>{props.name}</h3>
            <div>
                <p>Strength: {props.stats.strength}</p>
                <p>Agility: {props.stats.agility}</p>
                <p>Intelligence: {props.stats.intelligence}</p>
            </div>
            <p>Reward: {props.reward}</p>
            <p>Description: {props.description}</p>
            <button onClick={handleAccept} disabled={accepted}>Accept</button>
        </div>
    )
}