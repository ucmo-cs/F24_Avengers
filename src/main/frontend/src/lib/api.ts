export function getLoans() {
    return fetch("/api/loans")
        .then((response) => response.json())
        .catch((error) => console.error(error));
}

export function getAccounts() {
    return fetch("/api/accounts")
        .then((response) => response.json())
        .catch((error) => console.error(error));
}