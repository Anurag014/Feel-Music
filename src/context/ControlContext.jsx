/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { PlayerState, useYoutube } from "react-youtube-music-player";

const ControlContext = createContext();

export const ControlProvider = ({ children }) => {
  const [youtubeId, setYoutubeId] = useState('');
  const [type, setType] = useState('');
  const [colorPalette, setColorPalette] = useState({});
  const [musicInfo, setMusicInfo] = useState({});
  const { playerDetails, actions } = useYoutube({
    id: youtubeId,
    type: type,
    options: {
    //   autoplay: true, for development purposes
    }
  });


  return (
    <ControlContext.Provider
      value={{ setYoutubeId, setType, setMusicInfo,setColorPalette,colorPalette,musicInfo,playerDetails, actions, PlayerState }}
    >
      {children}
    </ControlContext.Provider>
  );
};

const useControl = () => {
  return useContext(ControlContext);
};

export { useControl };
