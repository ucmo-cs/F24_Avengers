import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod"
import {useAuth} from "@/components/Auth.tsx";
import {useNavigate} from "react-router-dom";

const formSchema = z.object({
    email: z.string().email({
        message: "Invalid email address",
    }),
    password: z.string({
        message: "Invalid password",
    }),
})

function Login() {
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Password is incorrect")
            }
            return response.json();
        }).then((account: Account) => { //Todo: auth code here not fully protected
            signIn(data);
            if (account.admin) {
                navigate("/app-demo");
            } else {
                navigate("/account/" + account.id + "?loan=1");
            }
        }).catch((error) => {
            form.setError(
                "password",
                {
                    type: "value",
                    message: error.message,
                }
            )
        })
    }

    return (
        <div className={"flex rounded-3xl floating-shadow w-[900px] h-[600px] mb-16 overflow-hidden"}>
            <div className={"bg-white w-1/2 px-6 py-12"}>
                <h1>Welcome Back!</h1>
                <h2 className={"font-light"}>Login to access loans and more.</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className={"mt-8"}>
                                    <FormLabel className={"text-black"}>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem className={"mt-6"}>
                                    <FormLabel className={"text-black"}>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type={"button"} variant={"link"} className={"px-0 text-commerce-green font-semibold"}>Forgot Password?</Button>
                        <Button type={"submit"} className={"mt-4 py-6 w-full"}>Login</Button>
                    </form>
                </Form>
            </div>
            <div className={"bg-commerce-green w-1/2"}>
                <img className={"m-auto mt-64"} src={"/commerce_globe_45x48.png"} alt={"Logo"}/>
                <p className={"m-auto w-fit text-4xl text-white font-extrabold"}>Commerce</p>
            </div>
        </div>
    );
}

export default Login;