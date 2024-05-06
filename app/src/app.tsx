import { RouterProvider } from "@tanstack/react-router";
import useAuth from "./hooks/useAuth";
import router from "./router";

function App() {
  return (
    <RouterProvider
      router={router}
      context={{
        auth: useAuth(),
      }}
    />
  );
}

export default App;
