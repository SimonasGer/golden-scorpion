import { Link } from "react-router-dom"

export const AcceptedMissionCard = (props) => {
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
            <Link to={`/missions/${props.id}`}>Expand</Link>
        </div>
    )
}