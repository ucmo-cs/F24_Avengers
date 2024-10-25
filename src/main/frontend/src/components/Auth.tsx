import {createContext, useContext, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";


interface AuthContextType {
    user: Login | undefined;
    signIn: (data: any) => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children}: Props) {
    const [user, setUser] = useState<any | undefined>(() => {
        const user = sessionStorage.getItem("user");
        return user ? JSON.parse(user) : undefined;
    });

    const signIn = (data: any) => {
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
    };

    const signOut = () => {
        setUser(undefined);
        sessionStorage.removeItem("user");
    };

    return (
      <AuthContext.Provider value={{user, signIn, signOut}}>
          {children}
      </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

function ProtectedRoute() {
    const {user} = useAuth();
    console.log(`User2: ${user}`);
    if (user === undefined) {
        return <Navigate to={"/login"} replace />;
    }
    return <Outlet />;
}

export { AuthProvider, useAuth, ProtectedRoute };