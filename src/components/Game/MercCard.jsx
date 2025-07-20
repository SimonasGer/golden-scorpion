export const MercCard = (props) => {
    const handleHire = () => {
        
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
            <p>Description: {props.description}</p>
            <p>Wage: {props.wage}</p>
            <p>Injury Status: {props.injuryStatus}</p>
            <button onClick={handleHire}>Hire</button>
        </div>
    )
}