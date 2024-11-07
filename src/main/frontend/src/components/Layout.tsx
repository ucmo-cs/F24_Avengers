import {Outlet} from "react-router-dom";

function Layout() {
  return (
    <>
        <nav className={"py-3 w-11/12 mx-auto"}>
            <div className={"flex items-center bg-commerce-green rounded-full px-2 py-1 nav-shadow"}>
                <img src={"/commerce_globe_45x48.png"} alt={"Logo"} />
            </div>
        </nav>
        <div className={"grow flex flex-col justify-center items-center"}>
            <Outlet />
        </div>
    </>
  );
}

export default Layout;