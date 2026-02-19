import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import App from "../pages/App";
import ProtectedRoute from "./ProtectedRoute";

const router: any = createBrowserRouter([
    {
        path: "/",
        element: <PublicRoute><Login /></PublicRoute>,
    },
    {
        path: "/register",
        element: <PublicRoute><Register /></PublicRoute>,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/home",
                element: <App />
            }
        ]
    }
]);

export default router;