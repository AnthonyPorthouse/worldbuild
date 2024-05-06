import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { Auth } from "../hooks/useAuth";

type PageWithBlocks = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;

  world: {
    id: string,
    name: string,
    slug: string,
  }

  blocks: {
    id: string;
    content: string;
    revealed: boolean;
  }[];
};

const getPageQuery = (auth: Auth, world: string, slug: string) => {
  return queryOptions({
    queryKey: [auth, world, "page", slug],
    queryFn: async () => {
      const token = await auth.getTokenOrRefresh();

      if (!token) {
        throw new Error('Not authenticated');
      }

      const res = await axios.get<PageWithBlocks>(
        `https://api.worldbuild.localhost/${world}/pages/${slug}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return res.data;
    },
  });
};

export default getPageQuery;
