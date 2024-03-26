import React from 'react'
import {Link} from 'react-router-dom'

function PlayList({ playLists }) {
    console.log(playLists.playlistId)
    return (
        <>
            <h2 className="text-xl font-bold mb-4">{playLists?.title}</h2>
            <div className="flex overflow-x-scroll no-scrollbar gap-5 pb-10">
                {playLists?.contents.map((playList, index) => (
                    <Link to={{
                        pathname: `/playlist/${playList.playlistId}/playlist`,
                        search: `?title=${playList.name}&thumbnailUrl=${encodeURIComponent(playList.thumbnails[0].url)}`
                    }}
                        key={index}
                    >
                        {console.log(playList.playlistId)}
                        <div className="h-40 w-36 flex-shrink-0">
                            <img src={playList.thumbnails[0].url} alt={playList.name} className="w-36 h-36 object-cover rounded" />
                            <div className="w-full text-white p-2">
                                <p className="text-sm font-semibold overflow-ellipsis line-clamp-1">{playList.name}</p>
                            </div>
                        </div>
                    </Link> 
                ))}
            </div>
        </>
    )
}

export default PlayList