import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { Helmet } from "react-helmet-async";

export const Route = createLazyFileRoute("/$world/pages/")({
  component: Pages,
});

function Pages() {
  const pages = Route.useLoaderData();

  return (
    <div>
      <Helmet>
        <title>{pages.at(0)?.world.name} - WorldBuild</title>
      </Helmet>
      <h1 className="text-2xl">Pages</h1>
      <ul>
        {pages.map(({ id, title, slug, world }) => (
          <li key={id}>
            <Link
              to="/$world/pages/$slug"
              params={{
                world: world.slug,
                slug,
              }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
