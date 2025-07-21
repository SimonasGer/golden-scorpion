import { useState, useEffect } from "react";
import axios from "axios";
import { AcceptedMissionCard } from "./AcceptedMissionCard";

export const AcceptedMissions = () => {
    const [missions, setMissions] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get("http://localhost:8080/missions/accepted",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                setMissions(res.data.data.missions)
            } catch (err) {
                console.error(err)
                setError("Failed to fetch mercenaries.")
            } finally {
                setLoading(false)
            }
        }
        fetchMissions()
    }, [])

    return (
        <section>
            <h2>Available missions</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Loading missions...</p>}
            {missions.map((mission, index) => (
                <AcceptedMissionCard
                    key={index}
                    id={mission._id}
                    name={mission.name}
                    stats={mission.stats}
                    reward={mission.reward}
                    description={mission.description}
                />
            ))}
        </section>
    )
}