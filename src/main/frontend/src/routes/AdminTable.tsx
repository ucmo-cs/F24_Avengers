import {useCallback, useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {useNavigate} from "react-router-dom";

function AdminTable() {
  const [data, setData] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getLoans = useCallback(() => {
    fetch("/api/loans")
      .then((response) => response.json())
      .then((data) => {
          setData(data);
          setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [data]);

  useEffect(() => {
    getLoans();
  }, []);

  return (
    <div className={"flex flex-col items-center"}>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div className={"border-2 rounded-2xl overflow-hidden"}>
                <Table>
                    <TableHeader className={"bg-muted/50"}>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Origin Amount</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Interest Rate</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((loan) => {
                            const date = new Date(loan.date);
                            return (
                                <TableRow key={loan.id} onClick={() => {navigate(`/account/${loan.account?.id}`)}} className={"cursor-pointer"}>
                                    <TableCell>{loan.account?.email}</TableCell>
                                    <TableCell>{date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear()}</TableCell>
                                    <TableCell>{loan.originAmount}</TableCell>
                                    <TableCell>{loan.currentAmount}</TableCell>
                                    <TableCell>{loan.interestRate}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

        )}
    </div>
  );
}

export default AdminTable;