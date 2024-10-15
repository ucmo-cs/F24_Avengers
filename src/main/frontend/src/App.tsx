import {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import "@/index.css";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    console.log("mounted"); // TODO remove

    fetch("http://localhost:8080/accounts")
        .then(response => response.json())
        .then(data => setAccounts(data))
        .catch(error => console.error(error));

    return () => {
      console.log("unmounted"); // TODO remove
    }
  }, []);


    return (
    <div className={"flex m-auto w-fit h-screen justify-center flex-col items-center"}>
        <h1>Commerce Bank Frontend</h1>
        <Button  className="my-6">This does nothing</Button>
        <Table>
            <TableCaption>list of Accounts in DB</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>username</TableHead>
                    <TableHead>Password</TableHead>
                    <TableHead>email</TableHead>
                    <TableHead>phoneNumber</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {accounts.map((account) => (
                    <TableRow key={account.acctId}>
                        <TableCell>{account.acctId}</TableCell>
                        <TableCell>{account.userType}</TableCell>
                        <TableCell>{account.username}</TableCell>
                        <TableCell>{account.password}</TableCell>
                        <TableCell>{account.email}</TableCell>
                        <TableCell>{account.phoneNumber}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  )
}

export default App
