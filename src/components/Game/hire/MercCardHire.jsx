import axios from "axios"
import { useState } from "react";

export const MercCardHire = (props) => {
    const [hired, setHired] = useState(false);
    const handleHire = async () => {
        try {
            setHired(true);
            const token = localStorage.getItem("token")
            console.log("Hiring merc:", props)
            const res = await axios.post("http://localhost:8080/mercs/hire", props,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log("Merc hired:", res.data.data.merc)
        } catch (err) {
            console.error("Failed to hire merc:", err)
        }
    }

    return (
        <div className="merc-card">
            <h3>{props.firstName} {props.lastName}</h3>
            <div>
                <p>Strength: {props.stats.strength}</p>
                <p>Agility: {props.stats.agility}</p>
                <p>Intelligence: {props.stats.intelligence}</p>
            </div>
            <p>Price: {props.price}</p>
            <p>Archetype: {props.archetype}</p>
            <p>Description: {props.description}</p>
            <p>Wage: {props.wage}</p>
            <p>Injury Status: {props.injuryStatus}</p>
            <button onClick={handleHire} disabled={hired}>Hire</button>
        </div>
    )
}