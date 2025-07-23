import { useState, useEffect } from "react";
import axios from "axios";
import { Header } from "../Header";
import { MercCardOwned } from "./MercCardOwned";

export const OwnedMercs = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [mercs, setMercs] = useState([])
    const [gold, setGold] = useState(0)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMercs = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.get(`${apiUrl}/mercs`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                setMercs(res.data.data.mercs)
                setGold(res.data.data.gold)
            } catch (err) {
                console.error(err)
                setError("Failed to fetch owned mercenaries.")
            } finally {
                setLoading(false)
            }
        }
        fetchMercs()
    }, [apiUrl])
    return (
        <>
        <Header/>
        <section className="hire-section">
            <h2 className="section-title">Hired mercenaries</h2>
            <p className="gold-amount">Gold: {gold}</p>
            {error && <p className="error-msg">{error}</p>}
            {loading && <p className="loading-msg">Loading mercenaries...</p>}
            {mercs.map((merc, index) => (
                <MercCardOwned 
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
                    setGold={setGold}
                    gold={gold}
                />
            ))}
        </section>
        </>
    )
}