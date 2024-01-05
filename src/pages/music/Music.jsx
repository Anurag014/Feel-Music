import { useParams, useLocation } from "react-router-dom"
import { PlayerState, useYoutube } from "react-youtube-music-player";
import {
    IoPause,
    IoPlay,
    IoPlaySkipBack,
    IoPlaySkipForward,
    IoStop,
    IoVolumeHigh,
    IoVolumeMedium,
    IoVolumeLow,
    IoVolumeMute
} from "react-icons/io5";
import { Badge } from "@/components/ui/badge";
const Music = () => {
    const { youtubeId } = useParams();
    console.log(youtubeId);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const { playerDetails, actions } = useYoutube({
        id: youtubeId,
        type: "video",
        options: {
            autoplay: true,
        }
    });
    const music = {
        youtubeId: youtubeId,
        title: query.get('title'),
        thumbnailUrl: decodeURIComponent(query.get('thumbnailUrl')),
        artists: JSON.parse(query.get('artists'))
    };
    console.log(music)
    const renderVolumeIcon = () => {
        if (playerDetails.volume === 0) {
            return <IoVolumeMute />;
        }
        if (playerDetails.volume <= 30) {
            return <IoVolumeLow />;
        }
        if (playerDetails.volume <= 60) {
            return <IoVolumeMedium />;
        }
        return <IoVolumeHigh />;
    };
    return (
        <div>
            <h1>react-youtube-music-player</h1>
            <div className="video-title">{playerDetails.title}</div>
            <div className="player-controls">
                <button onClick={actions.previousVideo}>
                    <IoPlaySkipBack />
                </button>
                {playerDetails.state === PlayerState.PLAYING ? (
                    <button className="emphasised" onClick={actions.pauseVideo}>
                        <IoPause />
                    </button>
                ) : (
                    <button className="emphasised" onClick={actions.playVideo}>
                        <IoPlay />
                    </button>
                )}
                <button onClick={actions.stopVideo}>
                    <IoStop />
                </button>
                <button onClick={actions.nextVideo}>
                    <IoPlaySkipForward />
                </button>
                <div className="volume-control">
                    {renderVolumeIcon()}
                    <input
                        type="range"
                        value={playerDetails.volume ?? 0}
                        min={0}
                        max={100}
                        onChange={(event) => actions.setVolume(event.target.valueAsNumber)}
                    />
                </div>
                <img src={music.thumbnailUrl} alt={music.title} />
                {music.artists.map((artist) => (
                    <div className="flex flex-wrap w-auto" key={artist.id} >
                        <Badge variant="outline" className="text-xs my-1 text-white">{artist.name}</Badge>
                    </div>
                ))}
                <div>/suggestions/:youtubeId ka istemaal karke diye kisi bhi gaane ka suggestions get kar skte s recommendation aam bhasha me</div>
            </div>
        </div>
    )
}

export default Music