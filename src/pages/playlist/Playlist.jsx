import React from 'react'
import { useParams, useLocation } from "react-router-dom"
import { usePalette } from 'react-palette';
import PlaylistMusic from '@/components/PlaylistMusic';

function Playlist() {

    const { playlistId, type } = useParams();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const playlist = {
        playlistId: playlistId,
        title: query.get('title'),
        thumbnailUrl: decodeURIComponent(query.get('thumbnailUrl'))
    };
    const { data, loading, error } = usePalette(playlist.thumbnailUrl)
    console.log(playlist)

    return (
        <>
            <div className={`p-4 flex flex-col sm:flex-row gap-4 md:gap-8 items-center justify-center md:justify-start`}
                style={{
                    background: `linear-gradient(to bottom, ${data.vibrant} 50%, black)`,
                }}
            >
                <img src={playlist.thumbnailUrl} alt={playlist.title} className="w-52 shadow-2xl rounded-lg object-contain" referrerPolicy="no-referrer" />
                <div className="flex flex-col px-8 gap-4">
                    <h1 className="text-4xl md:text-[3rem] lg:text-[5rem] md:leading-10 lg:leading-[5rem] font-black">{playlist.title}</h1>
                </div>
            </div>
            <PlaylistMusic playlistId={playlist.playlistId} />
        </>
    )
}

export default Playlist