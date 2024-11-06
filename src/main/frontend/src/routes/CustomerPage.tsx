import { useParams } from "react-router-dom";
import {useCallback, useEffect, useState} from "react";


function CustomerPage() {
    const { id } = useParams();

    const [customer, setCustomer] = useState<Account | null>(null);

    const getCustomer = useCallback(() => {
        fetch(`/api/account/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCustomer(data);
            })
            .catch((error) => console.error(error));
    }
    , [id]);

    useEffect(() => {
        getCustomer();
    }, []);

  return (
    <div>
      <h1>{`Customer: ${id}`}</h1>
        {customer ? (
            <div>
                <p>{JSON.stringify(customer)}</p>
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
  );
}

export default CustomerPage;