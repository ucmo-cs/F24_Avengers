import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarIcon} from "lucide-react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {Input} from "@/components/ui/input.tsx";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {getAccounts} from "@/lib/api.ts";
import {useEffect, useState} from "react";

const formSchema = z.object({
    id: z.coerce.number().or(z.literal("")),
    originAmount: z.coerce.number().or(z.literal("")),
    currentAmount: z.coerce.number().or(z.literal("")),
    interestRate: z.coerce.number().or(z.literal("")),
    date: z.date(),
});

function CreateLoanDialog({ toggle, submit }: { toggle?: () => void, submit?: () => void }) {
    const [accountPopOverOpen, setAccountPopOverOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: "",
            originAmount: "",
            currentAmount: "",
            interestRate: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        form.reset();
        fetch("/api/loan", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "originAmount": data.originAmount,
                "currentAmount": data.currentAmount,
                "interestRate": data.interestRate,
                "date": data.date,
                "account": {
                    "id": data.id,
                }
            })
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Failed to create loan");
            }
        }).then(() => {
            submit && submit();
        }).catch((error) => {
            console.error(error);
        });
    };

    const [accounts, setAccounts] = useState<Account[]>([]);
    useEffect(() => {
        getAccounts().then((data) => {
            setAccounts(data);
            console.log("Dialog Use Effect Loaded");
        });
    }, []);

    const [calendarDialogOpen, setCalendarDialogOpen] = useState(false);

    return (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader className={"mb-5"}>
                            <DialogTitle>New Loan</DialogTitle>
                            <DialogDescription>
                                Create a new loan by filling out the form below.
                            </DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={form.control}
                            name={"id"}
                            render={({field}) => (
                                <FormItem className={"flex flex-col"}>
                                    <FormLabel>Account Id</FormLabel>
                                    <Popover open={accountPopOverOpen} onOpenChange={setAccountPopOverOpen}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        accounts.find((account) => account.id === field.value)?.email
                                                    ) : (
                                                        <span>Select an account</span>
                                                    )}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder="Search for an account..."
                                                    className="w-full"
                                                />
                                                <Button className=" my-1 mx-1" variant="outline" size={"sm"} onClick={toggle}>
                                                    Create Account
                                                </Button>
                                                <CommandList>
                                                    <CommandEmpty>No Accounts Found.</CommandEmpty>
                                                    <CommandGroup title="Accounts">
                                                        {
                                                            /* TODO create request for just accounts or at least refernce */
                                                            accounts.map((account) => (
                                                                <CommandItem
                                                                    key={account?.id}
                                                                    onSelect={() => {
                                                                        form.setValue("id", account?.id);
                                                                        setAccountPopOverOpen(false);
                                                                    }}
                                                                    value={account?.phoneNumber + "|" + account?.email}
                                                                >
                                                                    {account?.email}
                                                                </CommandItem>
                                                            ))
                                                        }
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"originAmount"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Origin Amount</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"currentAmount"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Current Amount</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"interestRate"}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Interest Rate</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            defaultValue={new Date()}
                            render={({ field }) => (
                                <FormItem className="flex flex-col mt-1">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                    onClick={() => setCalendarDialogOpen(!calendarDialogOpen)}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={(date) => {
                                                    field.onChange(date);
                                                    setCalendarDialogOpen(false);
                                                    }}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className={"mt-2"}>
                            <DialogClose asChild>
                                <Button type={"submit"}>Submit</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button variant={"outline"}>Cancel</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
    )
}

export default CreateLoanDialog;