import axios from "axios"
import { useState } from "react";

export const MercCardOwned = (props) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [hired, setHired] = useState(false);
    const [injuryStatus, setInjuryStatus] = useState(props.injuryStatus);
    const [error, setError] = useState("");
    const buttonLabel = props.injuryStatus === "dead" ? "Bury" : "Fire"

    const handleHeal = () => {
        try {

            const token = localStorage.getItem("token")
            axios.patch(`${apiUrl}/mercs/${props.id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            props.setGold(props.gold - 100);
            setInjuryStatus("healthy");
            setError("");
        } catch (err) {
            console.error("Failed to heal merc:", err)
            setError("Failed to heal mercenary.")
        }
    }

    const handleFire = async () => {
        try {
            setHired(true);
            const token = localStorage.getItem("token")
            const res = await axios.delete(`${apiUrl}/mercs/${props.id}`,
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
        <div className={`merc-card injury-${injuryStatus}`}>
            <h3 className="merc-title">{props.firstName} {props.lastName}</h3>
            <div className="merc-stats">
                <p>Strength: {props.strength}</p>
                <p>Agility: {props.agility}</p>
                <p>Intelligence: {props.intelligence}</p>
            </div>
            <p>Price: {props.price}</p>
            <p>Archetype: {props.archetype}</p>
            <p className="merc-description">Description: {props.description}</p>
            <p>Wage: {props.wage}</p>
            <p className="injury-status">Injury Status: {injuryStatus}</p>
            <div>
                <button className="action-button" onClick={handleFire} disabled={hired}>{buttonLabel}</button>
                {injuryStatus === "injured" && <button className="action-button" onClick={handleHeal}>Heal</button>}
                {error && <p className="error-msg">{error}</p>}
            </div>
        </div>
    )
}