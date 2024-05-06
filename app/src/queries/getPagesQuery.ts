import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { Auth } from "../hooks/useAuth";

type Page = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;

  world: {
    id: string;
    name: string;
    slug: string;
  };
};

const getPagesQuery = (auth: Auth, world: string) =>
  queryOptions({
    queryKey: [auth, world, "pages"],
    queryFn: async () => {
      const token = await auth.getTokenOrRefresh();

      if (!token) {
        throw new Error('Not authenticated');
      }

      const res = await axios.get<Page[]>(
        `https://api.worldbuild.localhost/${world}/pages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      return res.data;
    },
  });

export default getPagesQuery;
