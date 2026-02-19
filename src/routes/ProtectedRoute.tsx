import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(){
    const tokenJwt: string = localStorage.getItem("token") || "";

    if(!tokenJwt) return <Navigate to="/" />;

    return <Outlet />;
}

export default ProtectedRoute;