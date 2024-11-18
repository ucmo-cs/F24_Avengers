export async function getLoans() {
    return await fetch("/api/loans")
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getAccounts() {
    return fetch("/api/accounts")
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getAccountLoans(id: string | undefined) {
    return fetch(`/api/account/${id}/loans`)
        .then((response) => response.json())
        .catch((error) => console.error(error));
}