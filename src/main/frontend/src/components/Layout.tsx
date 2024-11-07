import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "@/components/Auth";
import {Button} from "@/components/ui/button";

function Layout() {
    const { signOut, user } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <nav className={"py-3 w-11/12 mx-auto"}>
                <div className={"flex items-center justify-between bg-commerce-green rounded-full px-2 py-1 nav-shadow"}>
                    <img src={"/commerce_globe_45x48.png"} alt={"Logo"} />
                    {user &&
                        <Button className={"rounded-full mr-2"} onClick={() => {
                            signOut();
                            navigate("/login");
                        }} variant={"secondary"}>Logout</Button>
                    }
                </div>
            </nav>
            <div className={"grow flex flex-col justify-center items-center"}>
                <Outlet />
            </div>
        </>
    );
}

export default Layout;