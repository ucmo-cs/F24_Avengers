/// <reference types="vite/client" />

interface Props {
    children?: React.ReactNode;
}

interface AuthContextType {
    user: Login | undefined;
    signIn: (data: any) => void;
    signOut: () => void;
}

interface Account {
    id: number;
    isAdmin: boolean;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

interface Loan {
    id: number;
    originAmount: number;
    currentAmount: number;
    interestRate: number;
    date: Date;
    account: Account;
}

interface Login {
    email: string;
    password: string;
}