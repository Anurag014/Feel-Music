import React from 'react'
import { useEffect, useState } from "react";

function Lyrics({ youtubeId }) {

    const [lyrics, setLyrics] = useState([])

    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            let url = `https://yt-music-api-peta.vercel.app/lyrics/${youtubeId}`
            const response = await fetch(url);
            const results = await response.json();
            
            // Check if results is an array
            if (Array.isArray(results)) {
                setLyrics(results);
            } else {
                setLyrics(["Lyrics not found"]);
            }
            
            setLoading(true);
            console.log(results);
        } catch (error) {
            console.error('Error fetching lyrics:', error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log(youtubeId)
        fetchData()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    } else {
        return (
            <>
                <div className="text-center">
                    {lyrics && lyrics.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
            </>
        )
    }
}

export default Lyrics