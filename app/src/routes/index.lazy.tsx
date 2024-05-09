import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const worlds = Route.useLoaderData();
  const { isAuthenticated } = useAuth();

  return (
    <div className="p-2">
      <Helmet>
        <title>WorldBuild</title>
      </Helmet>

      <h3>Welcome Home!</h3>

      <ul>
        {isAuthenticated() &&
          worlds.map((world) => (
            <li>
              <Link to="/$world/pages" params={{ world: world.slug }}>
                {world.name}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
