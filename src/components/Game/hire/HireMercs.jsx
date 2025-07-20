import { useState, useEffect } from "react";
import axios from "axios";
import { MercCardHire } from "./MercCardHire";

export const HireMercs = () => {
    const [mercs, setMercs] = useState([])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMercs = async () => {
            try {
                const token = localStorage.getItem("token")
                const res = await axios.post("http://localhost:8080/mercs?count=5",
                    {}, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                setMercs(res.data.data.mercs)
            } catch (err) {
                console.error(err)
                setError("Failed to fetch mercenaries.")
            } finally {
                setLoading(false)
            }
        }

        fetchMercs()
    }, [])

    return (
        <section>
            <h2>Hireable mercenaries</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Loading mercenaries...</p>}
            {mercs.map((merc, index) => (
                <MercCardHire
                    key={index}
                    firstName={merc.firstName}
                    lastName={merc.lastName}
                    stats={merc.stats}
                    price={merc.price}
                    archetype={merc.archetype}
                    description={merc.description}
                    wage={merc.wage}
                    injuryStatus={merc.injuryStatus}
                />
            ))}
        </section>
    )
}