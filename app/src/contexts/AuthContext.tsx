import { createContext } from "react";

export type User = {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

type AuthContext = {
    accessToken?: string;
    refreshToken?: string;
    user?: User;

    setAccessToken: (token?: string) => void;
    setRefreshToken: (token?: string) => void;
    setUser: (user?: User) => void;
}

const AuthContext = createContext<AuthContext>({
    accessToken: '',
    refreshToken: '',

    setAccessToken: () => {},
    setRefreshToken: () => {},
    setUser: () => {},
})

export default AuthContext;