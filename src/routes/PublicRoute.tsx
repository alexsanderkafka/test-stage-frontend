import { type JSX } from "react";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }: { children: JSX.Element }){
    const tokenJwt: string = localStorage.getItem("token") || "";

    if(tokenJwt) return <Navigate to="/home" />;

    return children;
}

export default PublicRoute;