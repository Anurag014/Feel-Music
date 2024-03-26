import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Recommendations = ({ youtubeId }) => {

    console.log(youtubeId)
    const [recommendations, setRecommendations] = useState([])

    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            let url = `https://yt-music-api-zeta.vercel.app/suggestions/${youtubeId}`
            const response = await fetch(url);
            const results = await response.json();
            setRecommendations(results)
            setLoading(true)
            console.log(results)
        } catch (error) {
            console.log(error)
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
                {recommendations && recommendations.map((recommendation) => (
                    <Link to={{
                        pathname: `/music/${recommendation.youtubeId}/video`,
                        search: `?title=${recommendation.title}&thumbnailUrl=${encodeURIComponent(recommendation.thumbnailUrl)}&artists=${JSON.stringify(recommendation.artists)}`
                    }}
                        key={recommendation.youtubeId}
                        className="px-1"
                    >
                    <div className="flex items-center pb-2 hover:border-white border-[0.5px] border-transparent p-2 rounded-md" >
                        <img src={recommendation.thumbnailUrl} alt={recommendation.title} className="w-12 h-12 object-cover rounded mr-4" />
                        <div className="flex flex-col flex-grow">
                            <div className="text-md font-bold overflow-hidden overflow-ellipsis" >{recommendation.title}</div>
                            <div className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                                {recommendation.artists.map(artist => artist.name).join(', ')}
                            </div>
                        </div>
                        <div className="text-sm ">{recommendation.duration.label}</div>
                    </div>
                    </Link>
                ))}
            </>
        )
    }
}

export default Recommendations