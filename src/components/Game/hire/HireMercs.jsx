import { useState, useEffect } from "react";
import axios from "axios";
import { MercCardHire } from "./MercCardHire";
import { Header } from "../Header";
import "./hire.scss";

export const HireMercs = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [mercs, setMercs] = useState([])
    const [gold, setGold] = useState(0)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    const deductGold = (amount) => {
        if (gold >= amount) {
            setGold(gold - amount);
            setError(""); // Clear any previous error
        } else {
            setError("Not enough gold.");
        }
    }

    useEffect(() => {
        const fetchMercs = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.post(`${apiUrl}/mercs?count=5`,
                    {}, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                setMercs(res.data.data.mercs)
                setGold(res.data.data.gold)
                console.log("Fetched data:", res.data.data);
            } catch (err) {
                console.error(err)
                setError("Failed to fetch mercenaries.")
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
            <div className="hire-header">
                <h2 className="section-title">Hire mercenaries</h2>
                <p className="gold-amount">Gold: {gold}</p>
            </div>
            {error && <p className="error-msg">{error}</p>}
            {loading && <p className="loading-msg">Loading mercenaries...</p>}
            {mercs.map((merc, index) => (
                <MercCardHire
                    key={index}
                    firstName={merc.firstName}
                    lastName={merc.lastName}
                    strength={merc.strength}
                    agility={merc.agility}
                    intelligence={merc.intelligence}
                    price={merc.price}
                    archetype={merc.archetype}
                    description={merc.description}
                    wage={merc.wage}
                    injuryStatus={merc.injuryStatus}
                    deductGold={deductGold}
                />
            ))}
        </section>
        </>
    )
}