import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "@/pages/home/Home";
import Library from "@/pages/library/library";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'library',
                element: <Library />
            }
        ]
    }
])

export default router;