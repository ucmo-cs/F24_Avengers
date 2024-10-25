/// <reference types="vite/client" />

interface Props {
    children?: React.ReactNode;
}

interface Account {
    id: number;
    userType: number;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
}

interface Login {
    email: string;
    password: string;
}