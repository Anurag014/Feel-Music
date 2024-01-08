import { useParams, useLocation } from "react-router-dom"
import { usePalette } from 'react-palette';
import { Button } from "@/components/ui/button";
import { useControl } from "@/context/ControlContext";
import { useEffect } from "react";
import PlayAndPause from "@/components/PlayAndPause";
import Suggestions from "@/components/Suggestions";
const Music = () => {
    const { youtubeId, type } = useParams();
    const { setYoutubeId, setType, setMusicInfo, setColorPalette } = useControl();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const music = {
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
    return (
        <>
            <div className={`p-4 flex flex-col sm:flex-row gap-4 md:gap-8 items-center justify-center md:justify-start`}
                style={{
                    background: `linear-gradient(to bottom, ${data.vibrant} 50%, black)`,
                }}
            >
                <img src={music.thumbnailUrl} alt={music.title} className="w-52 shadow-2xl rounded-lg object-contain" referrerPolicy="no-referrer" />
                <div className="flex flex-col px-8 gap-4">
                    <h1 className="text-4xl md:text-[3rem] lg:text-[5rem] md:leading-10 lg:leading-[5rem] font-black">{music.title}</h1>
                    <h2 className="text-xl font-semibold flex-col flex">{music.artists.map((artist, index) => (
                        <span key={index} className="px-4">{artist.name}</span>
                    ))}
                    </h2>
                </div>
            </div>
            <Button className='rounded-full mx-2'>
                <PlayAndPause />
            </Button>
            <Suggestions youtubeId={youtubeId}/>
        </>
    )
}

export default Music