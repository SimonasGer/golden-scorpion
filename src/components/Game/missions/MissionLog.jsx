import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../Header";
import { MissionLogCard } from "./MissionLogCard";

export const MissionLog = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [missions, setMissions] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${apiUrl}/missions/log`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                setMissions(res.data.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch mission log.");
            } finally {
                setLoading(false);
            }
        };
        fetchMissions();
    }, [apiUrl]);
    return (
        <div className="mission-log">
            
            <Header />
            <section className="mission-log-section">
                <h2 className="section-title">Mission Log</h2>
                <p className="log-text">Here you can track your past missions and their outcomes.</p>
                {error && <p className="error-msg">{error}</p>}
                {loading && <p className="loading-msg">Loading mission log...</p>}
                {missions.length > 0 ? (
                    missions.map((mission) => (
                        <MissionLogCard
                            key={mission.id}
                            id={mission.id}
                            name={mission.name}
                            strength={mission.strength}
                            agility={mission.agility}
                            intelligence={mission.intelligence}
                            status={mission.status}
                            reward={mission.reward}
                            description={mission.description}
                            date={mission.date}
                            mercs={mission.mercs}
                        />
                    ))
                ) : (
                    <p className="no-missions">No missions logged yet.</p>
                )}
            </section>
        </div>
    );
}