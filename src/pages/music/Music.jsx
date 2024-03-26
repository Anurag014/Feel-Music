import { useParams, useLocation } from "react-router-dom"
import { usePalette } from 'react-palette';
import { useControl } from "@/context/ControlContext";
import { useEffect } from "react";
import Recommendations from '../../components/Recommendations';

const Music = () => {
    const { youtubeId, type } = useParams();
    const { setYoutubeId, setType, setMusicInfo, setColorPalette } = useControl();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const music = {
        youtubeId: youtubeId,
        title: query.get('title'),
        thumbnailUrl: decodeURIComponent(query.get('thumbnailUrl')),
        artists: JSON.parse(query.get('artists'))
    };
    console.log(music)
    const { data, loading, error } = usePalette(music.thumbnailUrl)
    console.log(data, loading, error)
    useEffect(() => {
        setYoutubeId(youtubeId);
        setType(type);
        setMusicInfo(music)
        setColorPalette(data)
    }, [youtubeId, type, data])
    let artists = [];
    if (Array.isArray(music.artists)) {
        artists = music.artists;
    } else if (typeof music.artists === 'object' && music.artists !== null) {
        // Convert object into array with single item
        artists = [music.artists];
    }
    return (
        <>
            <div className={`p-4 flex flex-col sm:flex-row gap-4 md:gap-8 items-center justify-center md:justify-start`}
                style={{
                    background: `linear-gradient(to bottom, ${data.vibrant} 50%, black)`,
                }}
            >
                <img src={music.thumbnailUrl} alt={music.title} className="w-52 shadow-2xl rounded-lg object-contain" referrerPolicy="no-referrer" />
                <div className="flex flex-col px-8 gap-4">
                    <h1 className="text-4xl md:text-[3rem] lg:text-[5rem] md:leading-10 lg:leading-[5rem] font-black line-clamp-3">{music.title}</h1>
                    <h2 className="text-xl font-semibold flex-col flex">{artists.map((artist, index) => (
                        <span key={index} className="px-4">{artist.name}</span>
                    ))}
                    </h2>
                </div>
            </div>
            <div className="text-xl font-bold p-2">
                Recommendations
            </div>
            {/* <Suggestions youtubeId={music.youtubeId}/> */}
            <Recommendations youtubeId={music.youtubeId} />
        </>
    )
}

export default Music