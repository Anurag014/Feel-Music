import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function PlaylistMusic({ playlistId }) {
    const [playlistVideos, setPlaylistVideos] = useState([])

    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            let url = `https://yt-music-api-zeta.vercel.app/playlists/${playlistId}`
            const response = await fetch(url);
            const results = await response.json();
            setPlaylistVideos(results)
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
        console.log(playlistId)
        fetchData()
    }, [])

    if (loading) {
        return <h1>Loading...</h1>
    } else {
        return (
            <>
                {playlistVideos.videos && playlistVideos.videos.map((video) => (
                    <Link to={{
                        pathname: `/music/${video.id}/video`,
                        search: `?title=${video.title}&thumbnailUrl=${encodeURIComponent(video.thumbnail.url)}&artists=${JSON.stringify(video.channel.name)}`
                    }}
                        key={video.id}
                        className="px-1"
                    >
                        <div className="flex items-center pb-2 hover:border-white border-[0.5px] border-transparent p-2 rounded-md" >
                            <img src={video.thumbnail.url} alt={video.title} className="w-12 h-12 object-cover rounded mr-4" />
                            <div className="flex flex-col flex-grow">
                                <div className="text-md font-bold overflow-hidden overflow-ellipsis" >{video.title}</div>
                                <div className="text-sm overflow-hidden whitespace-nowrap overflow-ellipsis">
                                    {video.channel.name}
                                </div>
                            </div>
                            <div className="text-sm ">{video.duration_formatted}</div>
                        </div>
                    </Link>
                ))}
            </>
        )
    }
}

export default PlaylistMusic