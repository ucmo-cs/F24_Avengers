
function Login() {
    return (
        <div className={"flex rounded-3xl floating-shadow w-2/3 h-2/3 mb-16 overflow-hidden"}>
            <div className={"bg-white w-1/2 p-3"}>
                <h1>Bank Login</h1>
            </div>
            <div className={"bg-commerce-green w-1/2"}>
                <img className={"m-auto mt-8"} src={"/commerce_globe_45x48.png"} alt={"Logo"} />
            </div>
        </div>
    );
}

export default Login;