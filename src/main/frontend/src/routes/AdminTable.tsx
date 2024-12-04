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
import {useNavigate} from "react-router-dom";

import CreateLoanDialog from "@/components/CreateLoanDialog.tsx";
import DialogSwitcher from "@/components/DialogSwitcher.tsx";
import CreateAccountDialog from "@/components/CreateAccountDialog.tsx";

function AdminTable() {
  const [data, setData] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
            <DialogSwitcher>
                <CreateLoanDialog submit={getLoans} />
                <CreateAccountDialog />
            </DialogSwitcher>
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
                        {[...data, ...new Array(10 - data.length)].map((loan) => {
                            if (!loan) {
                                return (<TableRow key={Math.random()} className={"h-[45px]"}><TableCell/><TableCell/><TableCell/><TableCell/><TableCell/></TableRow>);
                            }
                            const date = new Date(loan.date);
                            return (
                                <TableRow key={loan.id} onClick={() => {navigate(`/account/${loan.account?.id}?loan=${loan.id}`)}} className={"cursor-pointer"}>
                                    <TableCell>{loan.account?.email}</TableCell>
                                    <TableCell>{date.toLocaleDateString("en-US")}</TableCell>
                                    <TableCell>{loan.originAmount.toLocaleString(undefined, {style: "currency", currency: "USD"})}</TableCell>
                                    <TableCell>{loan.currentAmount.toLocaleString(undefined, {style: "currency", currency: "USD"})}</TableCell>
                                    <TableCell>{loan.interestRate.toFixed(2) + "%"}</TableCell>
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