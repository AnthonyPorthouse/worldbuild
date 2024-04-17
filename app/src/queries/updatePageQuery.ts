import axios from "axios";

type PageWithBlocks = {
  title: string;

  blocks: {
    content: string;
    revealed: boolean;
  }[];
};

const updatePageQuery = async (slug: string, data: PageWithBlocks) => {
  const res = await axios.patch<PageWithBlocks>(
    `https://api.worldbuild.localhost/pages/${slug}`,
    data
  );

  return res.data;
};

export default updatePageQuery;
