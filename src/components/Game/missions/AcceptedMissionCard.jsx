import { Link } from "react-router-dom"

export const AcceptedMissionCard = (props) => {
    return (
        <div className="mission-card">
            <h3 className="merc-name">{props.name}</h3>
            <div className="merc-stats">
                <p>Strength: {props.stats.strength}</p>
                <p>Agility: {props.stats.agility}</p>
                <p>Intelligence: {props.stats.intelligence}</p>
            </div>
            <p>Reward: {props.reward}</p>
            <p className="merc-description">Description: {props.description}</p>
            <Link className="action-button" to={`/missions/${props.id}`}>Expand</Link>
        </div>
    )
}