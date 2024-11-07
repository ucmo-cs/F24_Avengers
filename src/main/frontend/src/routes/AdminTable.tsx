import {useCallback, useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from "@/components/ui/pagination"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {CalendarIcon, FilePlus2} from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";

const formSchema = z.object({
    id: z.coerce.number().or(z.literal("")),
    originAmount: z.coerce.number().or(z.literal("")),
    currentAmount: z.coerce.number().or(z.literal("")),
    interestRate: z.coerce.number().or(z.literal("")),
    date: z.date(),
});

function AdminTable() {
  const [data, setData] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
            getLoans();
        }).catch((error) => {
            console.error(error);
      });
  };

  const getLoans = useCallback(() => {
    fetch("/api/loans")
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          setData(data);
          setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [data]);

  useEffect(() => {
    getLoans();
  }, []);

  return (
    <>
        <div className={"mb-2 flex justify-between w-5/6"}>
            <h1 className={"text-4xl"}>Loans</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"}>Create Loan<FilePlus2/></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>New Loan</DialogTitle>
                        <DialogDescription>
                            Create a new loan by filling out the form below.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name={"id"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Account Id</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
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
                                                    onSelect={field.onChange}
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
                </DialogContent>
            </Dialog>
        </div>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className={"border-2 rounded-lg overflow-hidden w-5/6"}>
                <Table className={"text-xl "}>
                    <TableHeader className={"bg-muted/50"}>
                        <TableRow>
                            <TableHead className={"w-1/5"}>Name</TableHead>
                            <TableHead className={"w-1/5"}>Date</TableHead>
                            <TableHead className={"w-1/5"}>Origin Amount</TableHead>
                            <TableHead className={"w-1/5"}>Amount</TableHead>
                            <TableHead className={"w-1/5"}>Interest Rate</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((loan) => {
                            const date = new Date(loan.date);
                            console.log(loan);
                            return (
                                <TableRow key={loan.id} onClick={() => {navigate(`/account/${loan.account?.id}`)}} className={"cursor-pointer"}>
                                    <TableCell>{loan.account?.email}</TableCell>
                                    <TableCell>{date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()}</TableCell>
                                    <TableCell>{"$" + loan.originAmount.toFixed(2)}</TableCell>
                                    <TableCell>{"$" + loan.currentAmount.toFixed(2)}</TableCell>
                                    <TableCell>{loan.interestRate.toFixed(2)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        )}
    </>
  );
}

export default AdminTable;