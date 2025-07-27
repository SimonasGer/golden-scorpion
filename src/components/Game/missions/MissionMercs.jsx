export const MissionMercs = (props) => {
    return (
        <div className={`merc-card injury-${props.injury_status}`}>
            <h3 className="merc-name">{props.firstName} {props.lastName}</h3>
            <div className="merc-stats">
                <p>Strength: {props.strength}</p>
                <p>Agility: {props.agility}</p>
                <p>Intelligence: {props.intelligence}</p>
            </div>
            <p>Archetype: {props.archetype}</p>
            <p className="merc-description">Description: {props.description}</p>
            <p>Wage: {props.wage}</p>
            <p className="injury-status">Injury Status: {props.injury_status}</p>
            <label className="mission-checkbox-wrapper">
                <input
                    disabled={props.injury_status !== "healthy"}
                    className="mission-checkbox"
                    type="checkbox"
                    checked={props.sentMercs.includes(props.id)}
                    onChange={(e) => {
                        const isChecked = e.target.checked;
                        const id = props.id;
                        const nextWage = isChecked
                            ? props.calcWage + props.wage
                            : props.calcWage - props.wage;                        
                        if (nextWage > props.gold) {
                            props.setError2("You do not have enough gold to go on this mission.");
                        } else {
                            props.setError2("");
                        }
                        props.setWage(nextWage);
                        props.setSentMercs(prev => {
                            return isChecked ? [...prev, id] : prev.filter(m => m !== id);
                        });
                    }}
                />
                <span className="checkbox-label-text">Send on this mission</span>
            </label>
        </div>
    );
}