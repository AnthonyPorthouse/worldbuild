import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../contexts/AuthContext";
import { Auth } from "../hooks/useAuth";

const getUserQuery = (auth: Auth) =>
  queryOptions({
    queryKey: [auth, "user"],
    queryFn: async () => {
      const token = await auth.getTokenOrRefresh();

      if (!token) {
        return null;
      }

      const res = await axios.get<User>(
        "https://api.worldbuild.localhost/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      auth.setUser(res.data);

      return res.data;
    },
    enabled: auth.isAuthenticated(),
  });

export default getUserQuery;
