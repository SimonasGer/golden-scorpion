import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../Header";
import { MissionMercs } from "./MissionMercs";
import { useNavigate } from "react-router-dom";
import "./mission.scss"
export const MissionPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [mission, setMission] = useState(null);
    const [mercs, setMercs] = useState([]);
    const [sentMercs, setSentMercs] = useState([]);
    const [gold, setGold] = useState(0);
    const [wage, setWage] = useState(0);
    const [error1, setError1] = useState("");
    const [error2, setError2] = useState("");
    const [loading, setLoading] = useState(true);
    const handleMissionStart = async () => {
        try {
            const token = localStorage.getItem("token");
            const missionId = window.location.pathname.split("/").pop(); // Get the mission ID from the URL
            const res = await axios.patch(`${apiUrl}/missions/${missionId}`, { mercIds: sentMercs }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Mission started:", res.data);
            navigate("/missions/log");
        } catch (err) {
            console.error("Failed to start mission:", err);
        }
    }

    useEffect(() => {
        const fetchMission = async () => {
            try {
                const token = localStorage.getItem("token");
                const missionId = window.location.pathname.split("/").pop(); // Get the mission ID from the URL
                const res = await axios.get(`${apiUrl}/missions/${missionId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Fetched mission:", res.data.data);
                setMission(res.data.data.mission);
                setGold(res.data.data.gold);
            } catch (err) {
                console.error(err);
                setError1("Failed to fetch mission details.");
            } finally {
                setLoading(false);
            }
        };
        const fetchMercs = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${apiUrl}/mercs`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Fetched mercenaries:", res.data.data.mercs);
                setMercs(res.data.data.mercs);
            } catch (err) {
                console.error("Failed to fetch mercenaries:", err);
                setError1("Failed to fetch mercenaries.");
            }
        }
        fetchMercs();
        fetchMission();
    }, [apiUrl]);
    return (
        <>
        <Header />
        <div className="mission-page">
            <h1 className="mission-title">Mission Page</h1>
            <p className="mission-subtitle">Here you can view details about your mission.</p>
            {error1 && <p className="mission-error">{error1}</p>}
            {loading && <p className="mission-loading">Loading mission details...</p>}
            {mission && (
                <div className="mission-details">
                    <h2 className="mission-name">{mission.name}</h2>
                    <h3 className="mission-name">Stat requirements</h3>
                    <p className="mission-stat">Strength: {mission.stats.strength}</p>
                    <p className="mission-stat">Agility: {mission.stats.agility}</p>
                    <p className="mission-stat">Intelligence: {mission.stats.intelligence}</p>
                    <p className="mission-reward">Reward: {mission.reward}</p>
                    <p className="mission-description">Description: {mission.description}</p>
                </div>
            )}
            <div>            
                <h2>Available Mercenaries</h2>
                <p className="gold-amount">Gold: {gold}</p>
                <p className="wage-amount">Wage: {wage}</p>
            </div>
            {mercs.length > 0 ? (
                <div className="merc-list">
                    {mercs.map((merc, index) => (
                        <MissionMercs
                            key={index}
                            id={merc._id}
                            firstName={merc.firstName}
                            lastName={merc.lastName}
                            stats={merc.stats}
                            price={merc.price}
                            archetype={merc.archetype}
                            description={merc.description}
                            wage={merc.wage}
                            injuryStatus={merc.injuryStatus}
                            sentMercs={sentMercs}
                            setSentMercs={setSentMercs}
                            setWage={setWage}
                            calcWage={wage}
                            setError2={setError2}
                            gold={gold}
                        />
                    ))}
                    {error2 && <p className="error-msg">{error2}</p>}
                    <button disabled={error2} className="action-link" onClick={handleMissionStart}>Start mission</button>
                </div>
            ) : (
                <p>No mercenaries available.</p>
            )}
        </div>
        </>
    );
}