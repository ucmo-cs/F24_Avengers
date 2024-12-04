import {useCallback, useEffect, useState} from 'react';
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
import {useNavigate} from "react-router-dom";

function App() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const navigate = useNavigate();

    const getFakeAccounts = useCallback(() => {
        fetch("/api/accounts")
            .then(response => response.json())
            .then(data => setAccounts(data))
            .catch(error => console.error(error));
    }, [accounts]);

    const postFakeAccount = () => {
        fetch("/api/account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userType": 0,
                "username": "test",
                "password": "password",
                "email": "test@mail.com",
                "phoneNumber": "123-456-7890",
            })
        }).then(response => response.json())
            .then(data => console.log(data))
            .then(() => getFakeAccounts())
            .catch(error => console.error(error));
    };

    useEffect(() => {
        getFakeAccounts();
    }, []);

    return (
        <div className={"flex flex-col items-center"}>
            <h1>Commerce Bank Frontend</h1>
            <Button className="my-6" onClick={postFakeAccount}>This creates a fake class</Button>
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
                        <TableRow key={account.id} onClick={() => {navigate(`/account/${account.id}`)}} className={"cursor-pointer"}>
                            <TableCell>{account.id}</TableCell>
                            <TableCell>{account.isAdmin}</TableCell>
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
