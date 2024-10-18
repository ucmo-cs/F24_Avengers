import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";


function Login() {
    return (
        <div className={"flex rounded-3xl floating-shadow w-[900px] h-[600px] mb-16 overflow-hidden"}>
            <div className={"bg-white w-1/2 px-6 py-12"}>
                <h1>Welcome Back!</h1>
                <h2 className={"font-light"}>Login to access loans and more.</h2>
                <div className={"mt-8"}>
                    <Label>Email</Label>
                    <Input type={"email"} className={"mt-1"}/>
                </div>
                <div className={"mt-6"}>
                    <Label>Password</Label>
                    <Input type={"password"} className={"mt-1"}/>
                </div>
                <div className={"flex justify-between"}>
                    <Button variant={"link"} className={"mt-4 px-0 text-commerce-green font-semibold"}>Admin</Button>
                    <Button variant={"link"} className={"mt-4 px-0 text-commerce-green font-semibold"}>Forgot Password?</Button>
                </div>
                <Button className={"mt-8 w-full"}>Login</Button>
            </div>
            <div className={"bg-commerce-green w-1/2"}>
                <img className={"m-auto mt-64"} src={"/commerce_globe_45x48.png"} alt={"Logo"}/>
                <p className={"m-auto w-fit text-4xl text-white font-extrabold"}>Commerce</p>
            </div>
        </div>
    );
}

export default Login;