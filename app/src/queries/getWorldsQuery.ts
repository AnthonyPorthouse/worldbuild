import { queryOptions } from "@tanstack/react-query";
import axios from "axios";

type World = {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  }

const getWorldsQuery = queryOptions({
    queryKey: ['worlds'],
    queryFn: async () => {
        const res = await axios.get<World[]>("https://api.worldbuild.localhost/worlds")

        return res.data;
    },
})

export default getWorldsQuery;