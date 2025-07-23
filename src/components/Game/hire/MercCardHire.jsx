import axios from "axios"
import { useState } from "react";
import "./hire.scss";

export const MercCardHire = (props) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [hired, setHired] = useState(false);
    const handleHire = async () => {
        try {
            setHired(true);
            const token = localStorage.getItem("token")
            console.log("Hiring merc:", props)
            const res = await axios.post(`${apiUrl}/mercs/hire`, props,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            props.deductGold(props.price);
        console.log("Merc hired:", res.data.data.merc)
        } catch (err) {
            console.error("Failed to hire merc:", err)
        }
    }

    return (
        <div className="merc-card">
            <h3 className="merc-name">{props.firstName} {props.lastName}</h3>
            <div className="merc-stats">
                <p>Strength: {props.stats.strength}</p>
                <p>Agility: {props.stats.agility}</p>
                <p>Intelligence: {props.stats.intelligence}</p>
            </div>
            <p>Price: {props.price}</p>
            <p>Archetype: {props.archetype}</p>
            <p className="merc-description">Description: {props.description}</p>
            <p>Wage: {props.wage}</p>
            <p className="injury-status">Injury status: {props.injuryStatus}</p>
            <button className="action-button" onClick={handleHire} disabled={hired}>Hire</button>
        </div>
    )
}