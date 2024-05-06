import axios from "axios";
import { Auth } from "../hooks/useAuth";

type PageWithBlocks = {
  title: string;

  blocks: {
    content: string;
    revealed: boolean;
  }[];
};

const updatePageQuery = async (
  auth: Auth,
  world: string,
  slug: string,
  data: PageWithBlocks
) => {
  const token = await auth.getTokenOrRefresh();

  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await axios.patch<PageWithBlocks>(
    `https://api.worldbuild.localhost/${world}/pages/${slug}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export default updatePageQuery;
