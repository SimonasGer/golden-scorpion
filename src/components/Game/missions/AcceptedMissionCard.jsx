import { Link } from "react-router-dom"
import "./mission.scss"

export const AcceptedMissionCard = (props) => {
    return (
        <div className="merc-card">
            <h3 className="merc-name">{props.name}</h3>
            <div className="merc-stats">
                <p>Strength: {props.strength}</p>
                <p>Agility: {props.agility}</p>
                <p>Intelligence: {props.intelligence}</p>
            </div>
            <p>Reward: {props.reward}</p>
            <p className="merc-description">Description: {props.description}</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link className="action-link" to={`/missions/${props.id}`}>Expand</Link>
            </div>
        </div>
    )
}