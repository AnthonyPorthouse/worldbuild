import { ReactNode } from "@tanstack/react-router";
import { useState } from "react";
import AuthContext, { User } from "../contexts/AuthContext";

function AuthProvider({
  accessToken: initialAccessToken,
  refreshToken: initialRefreshToken,
  children,
}: {
  accessToken?: string;
  refreshToken?: string;
  children: ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string | undefined>(
    initialAccessToken
  );
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    initialRefreshToken
  );

  const [user, setUser] = useState<User | undefined>();

  function persistAccessToken(token: string|undefined) {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }

    setAccessToken(token);
  }

  function persistRefreshToken(token: string|undefined) {
    if (token) {
      localStorage.setItem('refreshToken', token);
    } else {
      localStorage.removeItem('refreshToken');
    }

    setRefreshToken(token);
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken: persistAccessToken,
        refreshToken,
        setRefreshToken: persistRefreshToken,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
