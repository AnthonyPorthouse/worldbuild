import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { Auth } from "../hooks/useAuth";

type World = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

const getWorldsQuery = (auth: Auth) =>
  queryOptions({
    queryKey: [auth, "worlds"],
    queryFn: async () => {
      const token = await auth.getTokenOrRefresh();

      if (!token) {
        return []
      }

      const res = await axios.get<World[]>(
        "https://api.worldbuild.localhost/worlds",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    },
    enabled: auth.isAuthenticated(),
  });

export default getWorldsQuery;
