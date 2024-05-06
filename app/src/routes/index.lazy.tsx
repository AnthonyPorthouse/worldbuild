import { Link, createLazyFileRoute } from '@tanstack/react-router';
import useAuth from '../hooks/useAuth';

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const worlds = Route.useLoaderData()
  const {isAuthenticated} = useAuth();

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>

      <ul>
      {isAuthenticated() && worlds.map((world) => <li>
        <Link to='/$world/pages' params={{ world: world.slug }}>{world.name}</Link>
      </li>) }
      </ul>
    </div>
  )
}