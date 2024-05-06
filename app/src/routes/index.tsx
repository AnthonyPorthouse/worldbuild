import { createFileRoute } from '@tanstack/react-router'
import getWorldsQuery from '../queries/getWorldsQuery'

export const Route = createFileRoute('/')({
  loader: ({context}) => context.queryClient.ensureQueryData(getWorldsQuery(context.auth))
})