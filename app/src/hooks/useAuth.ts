import axios from "axios";
import { decodeJwt } from "jose";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

function useAuth() {
  const context = useContext(AuthContext);

  function isTokenValid(jwt: string | undefined) {
    if (!jwt) {
      return false;
    }

    // FIXME: Should we validate the token?
    const payload = decodeJwt(jwt);

    return (
      payload.exp !== undefined && payload.exp >= Math.floor(Date.now() / 1000)
    );
  }

  async function refreshAccessToken() {
    const res = await axios.post<{
      access_token: string;
      refresh_token: string;
    }>("https://api.worldbuild.localhost/auth/refresh", null, {
      headers: {
        Authorization: `Bearer ${context.refreshToken}`,
      },
    });

    context.setAccessToken(res.data.access_token);
    context.setRefreshToken(res.data.refresh_token);

    return res.data.access_token;
  }

  async function getTokenOrRefresh() {
    if (!context.accessToken) {
      return null;
    }

    if (isTokenValid(context.accessToken)) {
      return context.accessToken;
    }

    return await refreshAccessToken();
  }

  return {
    ...context,
    isAuthenticated: () => isTokenValid(context.accessToken),
    isRefreshTokenValid: () => isTokenValid(context.refreshToken),
    tokenNeedsRefreshed: () =>
      context.accessToken !== undefined && !isTokenValid(context.accessToken),
    refreshAccessToken,
    getTokenOrRefresh,
  };
}

export type Auth = ReturnType<typeof useAuth>;

export default useAuth;
