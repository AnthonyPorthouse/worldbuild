import { QueryClient, useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  createRootRouteWithContext,
  useNavigate,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import useAuth from "../hooks/useAuth";
import getUserQuery from "../queries/getUserQuery";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: ReturnType<typeof useAuth>;
}>()({
  component: RootRoute,
});

function RootRoute() {
  const auth = useAuth();

  useQuery(getUserQuery(auth));
  const navigate = useNavigate();

  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only">
        Jump to Content
      </a>
      <div className="flex flex-col gap-4">
        <nav className="text-xl bg-slate-200 drop-shadow-lg">
          <ul className="container mx-auto py-4 flex gap-2">
            <li className="font-bold">
              <Link to="/">WorldBuild</Link>
            </li>
            {!auth.isAuthenticated() && (
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
            )}
            {auth.isAuthenticated() && <li> {auth.user?.email}</li>}
            {auth.isAuthenticated() && (
              <li>
                {" "}
                <button
                  onClick={() => {
                    auth.setUser();
                    auth.setAccessToken();
                    auth.setRefreshToken();

                    navigate({ to: "/" });
                  }}
                >
                  Log out
                </button>{" "}
              </li>
            )}
          </ul>
        </nav>

        <main id="content" className="container mx-auto">
          <Outlet />
        </main>
      </div>

      <TanStackRouterDevtools />
    </>
  );
}
