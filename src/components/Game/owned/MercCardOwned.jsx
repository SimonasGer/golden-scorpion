import axios from "axios"
import { useState } from "react";

export const MercCardOwned = (props) => {
    const [hired, setHired] = useState(false);
    const handleFire = async () => {
        try {
            setHired(true);
            const token = localStorage.getItem("token")
            const res = await axios.delete(`http://localhost:8080/mercs/${props.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log("Merc fired:", res.data.data.merc)
        } catch (err) {
            console.error("Failed to fire merc:", err)
        }
    }

    return (
        <div className={`merc-card injury-${props.injuryStatus}`}>
            <h3 className="merc-title">{props.firstName} {props.lastName}</h3>
            <div className="merc-stats">
                <p>Strength: {props.stats.strength}</p>
                <p>Agility: {props.stats.agility}</p>
                <p>Intelligence: {props.stats.intelligence}</p>
            </div>
            <p>Price: {props.price}</p>
            <p>Archetype: {props.archetype}</p>
            <p className="merc-description">Description: {props.description}</p>
            <p>Wage: {props.wage}</p>
            <p className="injury-status">Injury Status: {props.injuryStatus}</p>
            <button className="action-button" onClick={handleFire} disabled={hired}>Fire</button>
        </div>
    )
}