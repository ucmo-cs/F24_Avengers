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