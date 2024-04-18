import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { useState } from "react";

export const Route = createLazyFileRoute("/auth/login/")({
  component: Login,
});

function Login() {

  const [token, setToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [user, setUser] = useState();

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: async ({email, password}: {email: string, password: string}) => {
      const res = await axios.post<{access_token: string, refresh_token: string}>('https://api.worldbuild.localhost/auth/login', {
        email,
        password,
      });

      setToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token);

      const userRes = await axios.get('https://api.worldbuild.localhost/auth/me', {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        }
      });

      return userRes.data;
    },
    onSuccess: (data) => {
      setUser(data);
    }
  })

  const refreshMutation = useMutation({
    mutationKey: ['refresh', refreshToken],
    mutationFn: async () => {
      const res = await axios.post<{access_token: string, refresh_token: string}>('https://api.worldbuild.localhost/auth/refresh', null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      });

      setToken(res.data.access_token);
      setRefreshToken(res.data.refresh_token);

      const userRes = await axios.get('https://api.worldbuild.localhost/auth/me', {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        }
      });

      return userRes.data;
    },
    onSuccess: (data) => {
      setUser(data);
    }
  })

  const loginForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      console.log(value);
      return await mutation.mutateAsync(value)
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

          <div><button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            refreshMutation.mutateAsync();
          } }>Refresh</button></div>

          {user && <div>
            {user.email} <br />
            {user.refreshToken}
            </div>} 
        </form>
      </div>
    </div>
  );
}
