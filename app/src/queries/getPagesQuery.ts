import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

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

const getPagesQuery = (world: string) =>
  queryOptions({
    queryKey: [world, "pages"],
    queryFn: async () => {
      const res = await axios.get<Page[]>(
        `https://api.worldbuild.localhost/${world}/pages`
      );

      return res.data;
    },
  });

export default getPagesQuery;
