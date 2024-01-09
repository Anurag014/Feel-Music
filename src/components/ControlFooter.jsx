import { useControl } from '@/context/ControlContext';
import { HiOutlineBackward, HiOutlineForward, HiOutlineStop } from "react-icons/hi2";
import { SlVolume1, SlVolume2, SlVolumeOff, SlShuffle } from "react-icons/sl";
import PlayAndPause from './PlayAndPause';
import moment from 'moment';
import { useEffect, useState } from 'react';
import RangeInput from './RangeInput';

const ControlFooter = () => {
    const { playerDetails, actions, musicInfo, colorPalette, PlayerState } = useControl();

    const secondsToTime = (seconds) => {
        return moment.utc(seconds * 1000).format('mm:ss');
    }
    const [currentTime, setCurrentTime] = useState(playerDetails.currentTime);

    useEffect(() => {
        let intervalId;

        // Update currentTime periodically
        const startUpdatingTime = () => {
            intervalId = setInterval(() => {
                if (playerDetails.state === PlayerState.PLAYING) {
                    setCurrentTime(prevTime => {
                        const newTime = prevTime + 1;  // Update every second, adjust as needed
                        if (newTime >= playerDetails.duration) {
                            clearInterval(intervalId);
                            return playerDetails.duration;
                        }
                        return newTime;
                    });
                }
            }, 1000);  // Adjust the interval as needed
        };

        startUpdatingTime();

        // Cleanup interval when component unmounts
        return () => clearInterval(intervalId);
    }, [playerDetails.currentTime, playerDetails.duration]);

    const handleStop=()=>{
        actions.stopVideo();
        setCurrentTime(0);
    }
    return (
        <div className="text-white px-4 py-2 fixed bottom-0 left-0 w-full md:flex items-center hidden"
            style={{ backgroundColor: colorPalette && colorPalette.darkVibrant ? colorPalette.darkVibrant : 'black' }}>
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center w-1/3'>
                    <div className="thumbnail mr-4">
                        <img
                            src={musicInfo.thumbnailUrl}
                            alt={musicInfo.title}
                            className="w-16 h-16 object-cover rounded bg-gray-500"
                        />
                    </div>
                    <div className="music-info flex-grow">
                        <div className="text-xl font-bold line-clamp-1 w-52">{musicInfo.title ? musicInfo.title : 'No music playing'}</div>
                        <div className="text-xs font-semibold flex space-x-4">{musicInfo.artists && musicInfo.artists.map((artist, index) => (
                            <span key={index} className="">{artist.name}</span>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="player-controls flex flex-col items-center space-y-4 w-1/3">
                    <div className='flex space-x-4'>
                        <SlShuffle className="cursor-pointer" size={20} />
                        <HiOutlineBackward className="cursor-pointer" onClick={actions.previousVideo} size={25} />
                        <PlayAndPause />
                        <HiOutlineStop className="cursor-pointer" 
                        onClick={handleStop} size={25} />
                        <HiOutlineForward className="cursor-pointer" onClick={actions.nextVideo} size={25} />
                    </div>
                    <div className='flex space-x-4 items-center'>
                        <span>{secondsToTime(currentTime)}</span>
                        <RangeInput
                            value={(currentTime / playerDetails.duration) * 100}
                            className='!w-96'
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
                </div>
                <div className='flex items-center space-x-4 w-1/3 justify-end'>
                    {
                        playerDetails.volume === 0 ? <SlVolumeOff className="cursor-pointer" size={25} />
                            :
                            playerDetails.volume <= 50 ? <SlVolume1 className="cursor-pointer" size={25} />
                                :
                                <SlVolume2 className="cursor-pointer" size={25} />
                    }
                    <RangeInput
                        value={playerDetails.volume ?? 0}
                        min={0}
                        max={100}
                        onChange={(event) => actions.setVolume(event.target.valueAsNumber)}
                        className='!w-52'
                    />
                </div>
            </div>
        </div>
    );
};

export default ControlFooter;
