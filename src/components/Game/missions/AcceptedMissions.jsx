import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../Header";
import { AcceptedMissionCard } from "./AcceptedMissionCard";

export const AcceptedMissions = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [missions, setMissions] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get(`${apiUrl}/missions/accepted`,
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
    }, [apiUrl])

    return (
        <>
        <Header />
        <section className="hire-section">
            <h2 className="section-title">Available missions</h2>
            {error && <p className="error-msg">{error}</p>}
            {loading && <p className="loading-msg">Loading missions...</p>}
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
        </>
    )
}