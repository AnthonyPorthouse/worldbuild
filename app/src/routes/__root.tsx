import { QueryClient } from "@tanstack/react-query";
import { Link, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => (
    <>
      <a href="#content" className="sr-only focus:not-sr-only">
        Jump to Content
      </a>
      <div className="flex flex-col gap-4">
        <nav className="text-xl bg-slate-200 drop-shadow-lg">
          <ul className="container mx-auto py-4 flex gap-2">
            <li className="font-bold"><Link to="/">WorldBuild</Link></li>
            {/* <li>
              <Link to="/pages">Pages</Link>
            </li> */}
          </ul>
        </nav>

        <main id="content" className="container mx-auto">
          <Outlet />
        </main>
      </div>

      <TanStackRouterDevtools />
    </>
  ),
});
