import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/home/Home";
import Library from "@/pages/library/library";
import Error404 from "@/pages/Error404";
import App from "@/App";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/library',
                element: <Library />
            },
        ],
    },
    {
        path:"*",
        element:<Error404/>
    }
])

export default router;