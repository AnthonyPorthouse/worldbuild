import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { User } from "../../../contexts/AuthContext";
import useAuth from "../../../hooks/useAuth";

export const Route = createLazyFileRoute("/auth/login/")({
  component: Login,
});

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await axios.post<{
        access_token: string;
        refresh_token: string;
      }>("https://api.worldbuild.localhost/auth/login", {
        email,
        password,
      });

      auth.setAccessToken(res.data.access_token);
      auth.setRefreshToken(res.data.refresh_token);

      const userRes = await axios.get<User>(
        "https://api.worldbuild.localhost/auth/me",
        {
          headers: {
            Authorization: `Bearer ${res.data.access_token}`,
          },
        }
      );

      return userRes.data;
    },
    onSuccess: (data) => {
      auth.setUser(data);
      navigate({ to: '/' })
    },
  });


  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      return await mutation.mutateAsync(value);
    },
  });

  return (
    <div className="flex justify-center align-middle">
      <div className="border rounded-lg px-8 py-6 text-lg flex flex-col gap-4 w-4/12">
        <h1 className="text-2xl">Log In</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            loginForm.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col">
            <loginForm.Field
              name="email"
              children={(field) => (
                <>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </div>

          <div className="flex flex-col">
            <loginForm.Field
              name="password"
              children={(field) => (
                <>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            />
          </div>

          <div>
            <button>Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
}
