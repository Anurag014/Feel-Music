import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home/Home";
import Library from "@/pages/library/Library";
import Error404 from "@/pages/Error404";
import App from "@/App";
import Music from "@/pages/music/Music";
import Playlist from "@/pages/playlist/Playlist";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,

            },
            {
                path: '/library',
                element: <Library />
            },
            {
                path: '/music/:youtubeId/:type',
                element: <Music />
            },
            {
                path: '/playlist/:playlistId/:type',
                element: <Playlist />  
            }
        ],
    },
    {
        path: "*",
        element: <Error404 />
    }
])

export default router;