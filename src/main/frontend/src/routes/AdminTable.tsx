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