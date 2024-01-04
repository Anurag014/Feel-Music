import { Routes, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "@/pages/home/Home";
import Library from "@/pages/library/library";
import App from "@/App";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
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