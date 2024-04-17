import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

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

const getPageQuery = (world: string, slug: string) => {
  return queryOptions({
    queryKey: [world, "page", slug],
    queryFn: async () => {
      const res = await axios.get<PageWithBlocks>(
        `https://api.worldbuild.localhost/${world}/pages/${slug}`
      );

      return res.data;
    },
  });
};

export default getPageQuery;
