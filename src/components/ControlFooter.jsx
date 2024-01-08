import { useControl } from '@/context/ControlContext';
import { HiOutlineBackward, HiOutlineForward, HiOutlineStop } from "react-icons/hi2";
import { SlVolume1, SlVolume2, SlVolumeOff, SlShuffle } from "react-icons/sl";
import PlayAndPause from './PlayAndPause';
const ControlFooter = () => {
    const { playerDetails, actions, musicInfo,colorPalette } = useControl();
    return (
        <div className="text-white px-4 py-2 fixed bottom-0 left-0 w-full md:flex items-center hidden"
       style={{backgroundColor: colorPalette && colorPalette.darkVibrant ? colorPalette.darkVibrant : 'black'}}>
            <div className='flex items-center justify-between w-full'>
                <div className='flex'>
                    <div className="thumbnail mr-4">
                        <img
                            src={musicInfo.thumbnailUrl}
                            alt=""
                            className="w-16 h-16 object-cover rounded"
                        />
                    </div>
                    <div className="music-info flex-grow">
                        <div className="text-xl font-bold">{musicInfo.title}</div>
                        <div className="text-xs font-semibold flex space-x-4">{musicInfo.artists && musicInfo.artists.map((artist, index) => (
                            <span key={index} className="">{artist.name}</span>
                        ))}
                        </div>
                    </div>
                </div>
                <div className="player-controls flex items-center space-x-4">
                    <SlShuffle className="cursor-pointer" size={20}/>
                    <HiOutlineBackward className="cursor-pointer" onClick={actions.previousVideo} size={25} />
                    <PlayAndPause />
                    <HiOutlineStop className="cursor-pointer" onClick={actions.stopVideo} size={25} />
                    <HiOutlineForward className="cursor-pointer" onClick={actions.nextVideo} size={25} />
                </div>
                <div className='flex items-center space-x-4'>
                    {
                        playerDetails.volume === 0 ? <SlVolumeOff className="cursor-pointer" size={25} />
                            :
                            playerDetails.volume <= 50 ? <SlVolume1 className="cursor-pointer" size={25} />
                                :
                                <SlVolume2 className="cursor-pointer" size={25} />
                    }
                    <input
                        type="range"
                        value={playerDetails.volume ?? 0}
                        min={0}
                        max={100}
                        onChange={(event) => actions.setVolume(event.target.valueAsNumber)}
                        className="w-full h-1 bg-gray-300 rounded-full appearance-none focus:outline-none focus:ring focus:border-blue-300"
                    />

                </div>
            </div>
        </div>
    );
};

export default ControlFooter;
