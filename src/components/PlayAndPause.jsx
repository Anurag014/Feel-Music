import { HiOutlinePlay,HiOutlinePause } from "react-icons/hi2";
import { useControl } from "@/context/ControlContext";

const PlayAndPause = () => {
    const {actions,playerDetails ,PlayerState} = useControl();
  return (
    <>
        {playerDetails.state === PlayerState.PLAYING ? (
            <HiOutlinePause className="cursor-pointer" onClick={actions.pauseVideo} size={25} />
        ) : (
            <HiOutlinePlay className="cursor-pointer" onClick={actions.playVideo} size={25} />
        )}
    </>
  )
}

export default PlayAndPause