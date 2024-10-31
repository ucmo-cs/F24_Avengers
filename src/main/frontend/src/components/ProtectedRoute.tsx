import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "@/components/Auth.tsx";

function ProtectedRoute() {
    const {user} = useAuth();
    console.log(`User2: ${user}`);
    if (user === undefined) {
        return <Navigate to={"/login"} replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;