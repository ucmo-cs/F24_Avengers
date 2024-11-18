import { useParams } from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {getAccountLoans} from "@/lib/api.ts";


function CustomerPage() {
    const { id } = useParams<string>();

    const [account, setAccount] = useState<Account | null>(null);
    const [accountLoans, setAccountLoans] = useState<Loan[]>([]);

    const getAccount = useCallback(() => {
        fetch(`/api/account/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setAccount(data);
            })
            .catch((error) => console.error(error));
    }
    , [id]);

    useEffect(() => {
        getAccount();

        getAccountLoans(id)
            .then((data) => {
                setAccountLoans(data);
            })
            .catch((error) => console.error(error));
    }, []);

  return (
    <div className={"rounded-3xl floating-shadow p-5"}>
        <h1>{account?.username}</h1>
        <h2>{account?.email}</h2>
        <p>{accountLoans.length > 0 ? (
            accountLoans[0].originAmount
        ) : (
            "no loans"
        )}</p>
    </div>
  );
}

export default CustomerPage;