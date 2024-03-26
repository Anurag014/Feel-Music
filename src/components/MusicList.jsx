import React from 'react'
import { Link } from "react-router-dom";

const MusicList = ({ musicList }) => {
    return (
        <>
            <h2 className="text-xl font-bold mb-4">{musicList.title}</h2>
            <div className="flex overflow-x-auto no-scrollbar pb-10" style={{ WebkitOverflowScrolling: "touch" }}>
                <div className='grid grid-rows-4 grid-flow-col gap-2'>
                    {musicList.contents.map((music, index) => (
                        <Link to={{
                            pathname: `/music/${music.videoId}/video`,
                            search: `?title=${music.name}&thumbnailUrl=${encodeURIComponent(music.thumbnails[0].url)}&artists=${JSON.stringify(music.artist
                            )}`
                        }}
                            key={index}
                        >
                            <div className="flex h-20 w-64 items-center rounded-lg hover:border-white border-[0.5px] border-transparen">
                                <img src={music.thumbnails[0].url} alt={music.name} className="w-16 h-16 object-cover rounded m-2 mr-4" />
                                <div className='flex flex-col'>
                                    <p className="text-sm font-semibold overflow-ellipsis line-clamp-1">{music?.name}</p>
                                    <p className="text-xs text-gray-500">{music.artist?.name}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MusicList