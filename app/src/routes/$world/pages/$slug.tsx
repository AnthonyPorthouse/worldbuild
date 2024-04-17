import { createFileRoute } from '@tanstack/react-router';
import getPageQuery from '../../../queries/getPageQuery';

export const Route = createFileRoute('/$world/pages/$slug')({
  loader: async ({ context, params }) => context.queryClient.ensureQueryData(getPageQuery(params.world, params.slug)),
})