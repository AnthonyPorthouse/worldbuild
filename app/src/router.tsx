import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

declare module "@tanstack/react-router" {
    interface Register {
      router: typeof router;
    }
  }

const queryClient = new QueryClient();

const router = createRouter({
    routeTree,
    context: {
      queryClient: queryClient,
      auth: undefined!,
    },
    Wrap: ({ children }) => {
      return (
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      );
    },
  });

  export default router;