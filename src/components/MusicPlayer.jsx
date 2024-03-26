import React, { useState, useEffect } from 'react';
import { useControl } from '@/context/ControlContext';
import { HiOutlineBackward, HiOutlineForward, HiOutlineStop } from "react-icons/hi2";
import RangeInput from './RangeInput'; // Import your RangeInput component
import moment from 'moment';
import musicDisc from '../assets/music-disc.png'
import PlayAndPause from './PlayAndPause';
import Recommendations from './Recommendations';
import Lyrics from './Lyrics';

const MusicPlayer = () => {

    const { playerDetails, actions, musicInfo, colorPalette, PlayerState } = useControl();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(playerDetails.currentTime);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        let intervalId;
        const startUpdatingTime = () => {
            intervalId = setInterval(() => {
                if (playerDetails.state === PlayerState.PLAYING) {
                    setIsPlaying(true);
                    setCurrentTime(prevTime => {
                        const newTime = prevTime + 1;  // Update every second, adjust as needed
                        if (newTime >= playerDetails.duration) {
                            clearInterval(intervalId);
                            setIsPlaying(false);
                            return playerDetails.duration;
                        }
                        return newTime;
                    });
                    setRotation(prevRotation => prevRotation + 1); // Rotate every second
                } else {
                    setIsPlaying(false);
                }
            }, 1000);  // Adjust the interval as needed
        };

        startUpdatingTime();

        // Cleanup interval when component unmounts
        return () => {
            clearInterval(intervalId)
        };
    }, [playerDetails.currentTime, playerDetails.duration, PlayerState.PLAYING]);

    const handleStop = () => {
        actions.stopVideo();
        setCurrentTime(0);
        setIsPlaying(false);
    };

    const secondsToTime = (seconds) => {
        return moment.utc(seconds * 1000).format('mm:ss');
    };

    let artists = [];
    if (Array.isArray(musicInfo.artists)) {
        artists = musicInfo.artists;
    } else if (typeof musicInfo.artists === 'object' && musicInfo.artists !== null) {
        // Convert object into array with single item
        artists = [musicInfo.artists];
    }

    return (
        <>
            <aside className="bg-gray-800 text-white p-4  h-screen rounded-md mx-4 mb-6 flex flex-col items-center " style={{ background: colorPalette && colorPalette.vibrant ? `linear-gradient(to bottom, black 50%, ${colorPalette.vibrant})` : 'rgb(31 41 55 / var(--tw-bg-opacity))' }}>
                <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    {musicInfo.thumbnailUrl ?
                        <img
                            src={musicInfo.thumbnailUrl}
                            alt={musicInfo.title}
                            className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_2s_linear_infinite]' : ''}`}
                            style={{ transform: `rotate(${rotation}deg)` }}
                        />
                        :
                        <img
                            src={musicDisc}
                            alt="Track Disc"
                            className="w-full h-full object-cover animate-[spin_2s_linear_infinite]"
                            style={{ transform: `rotate(${rotation}deg)` }}
                        />
                    }
                </div>
                <div className="mt-4 text-center">
                    <h2 className="text-lg font-bold">{musicInfo.title || 'No music playing'}</h2>
                    <p className="text-sm">{artists ? artists.map(artist => artist.name).join(', ') : ''}</p>
                </div>
                <div className="flex justify-center items-center mt-4">
                    <HiOutlineBackward className="cursor-pointer" onClick={actions.previousVideo} size={25} />
                    <PlayAndPause />
                    <HiOutlineStop className="cursor-pointer" onClick={handleStop} size={25} />
                    <HiOutlineForward className="cursor-pointer" onClick={actions.nextVideo} size={25} />
                </div>
                <div className="flex justify-center items-center mt-4 mx-3">
                    <span>{secondsToTime(currentTime)}</span>
                    <RangeInput
                        value={(currentTime / playerDetails.duration) * 100}
                        className='w-40 mx-4'
                        min={0}
                        max={100}
                        onChange={(event) => {
                            const newValue = (event.target.value / 100) * playerDetails.duration;
                            playerDetails.currentTime = newValue;
                            actions.seekTo(newValue);
                            setCurrentTime(newValue);
                        }}
                    />
                    <span>{secondsToTime(playerDetails.duration)}</span>
                </div>
                <h3 className="text-lg text-center font-bold">Lyrics</h3>
                <div className="mt-4 w-full overflow-y-scroll no-scrollbar">
                    {/* <Recommendations youtubeId={musicInfo.youtubeId} /> */}
                    <Lyrics youtubeId={musicInfo.youtubeId} />
                </div>

            </aside>
        </>
    )
}

export default MusicPlayer;