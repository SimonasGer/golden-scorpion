import { useState, useEffect } from "react";
import axios from "axios";
export const MissionPage = () => {
    const [mission, setMission] = useState(null);
    const [mercs, setMercs] = useState([]);
    const [sentMercs, setSentMercs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    console.log(sentMercs);
    const handleMissionStart = async () => {
        try {
            const token = localStorage.getItem("token");
            const missionId = window.location.pathname.split("/").pop(); // Get the mission ID from the URL
            const res = await axios.patch(`http://localhost:8080/missions/${missionId}`, { mercIds: sentMercs }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Mission started:", res.data);
        } catch (err) {
            console.error("Failed to start mission:", err);
        }
    }

    useEffect(() => {
        const fetchMission = async () => {
            try {
                const token = localStorage.getItem("token");
                const missionId = window.location.pathname.split("/").pop(); // Get the mission ID from the URL
                const res = await axios.get(`http://localhost:8080/missions/${missionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMission(res.data.data.mission);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch mission details.");
            } finally {
                setLoading(false);
            }
        };
        const fetchMercs = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:8080/mercs", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Fetched mercenaries:", res.data.data.mercs);
                setMercs(res.data.data.mercs);
            } catch (err) {
                console.error("Failed to fetch mercenaries:", err);
                setError("Failed to fetch mercenaries.");
            }
        }
        fetchMercs();
        fetchMission();
    }, []);
    return (
        <div className="mission-page">
            <h1>Mission Page</h1>
            <p>Here you can view details about your mission.</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Loading mission details...</p>}
            {mission && (
                <div className="mission-details">
                    <h2>{mission.name}</h2>
                    <p>Strength: {mission.stats.strength}</p>
                    <p>Agility: {mission.stats.agility}</p>
                    <p>Intelligence: {mission.stats.intelligence}</p>
                    <p>Reward: {mission.reward}</p>
                    <p>Description: {mission.description}</p>
                </div>
            )}
            <h2>Available Mercenaries</h2>
            {mercs.length > 0 ? (
                <div className="merc-list">
                    {mercs.map((merc, index) => (
                        <div key={index} className="merc-card">
                            <h3>{merc.firstName} {merc.lastName}</h3>
                            <p>Strength: {merc.stats.strength}</p>
                            <p>Agility: {merc.stats.agility}</p>
                            <p>Intelligence: {merc.stats.intelligence}</p>
                            <p>Price: {merc.price}</p>
                            <p>Archetype: {merc.archetype}</p>
                            <p>Description: {merc.description}</p>
                            <p>Wage: {merc.wage}</p>
                            <p>Injury Status: {merc.injuryStatus}</p>
                            <input
                                type="checkbox"
                                checked={sentMercs.includes(merc._id)}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const id = merc._id;

                                    setSentMercs(prev => {
                                    if (isChecked) {
                                        return [...prev, id];
                                    } else {
                                        return prev.filter(m => m !== id);
                                    }
                                    });
                                }}
                            />
                        </div>
                    ))}
                    <button onClick={handleMissionStart}>Start mission</button>
                </div>
            ) : (
                <p>No mercenaries available.</p>
            )}
        </div>
    );
}