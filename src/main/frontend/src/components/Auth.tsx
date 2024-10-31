import {createContext, useContext, useState} from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children}: Props) {
    const [user, setUser] = useState<Login | undefined>(() => {
        const user = sessionStorage.getItem("user");
        return user ? JSON.parse(user) : undefined;
    });

    const signIn = (data: Login) => {
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

export { AuthProvider, useAuth };