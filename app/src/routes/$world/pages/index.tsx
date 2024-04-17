import { createFileRoute } from "@tanstack/react-router";
import getPagesQuery from "../../../queries/getPagesQuery";

export const Route = createFileRoute("/$world/pages/")({
  loader: ({context, params}) => context.queryClient.ensureQueryData(getPagesQuery(params.world))
    
});
