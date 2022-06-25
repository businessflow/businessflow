import { SyntheticEvent, useMemo, useState } from "react";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  NotificationsProvider,
  showNotification,
} from "@mantine/notifications";

import useSession from "../data/useSession";

function PasswordLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useSession();
  const from = useMemo(() => {
    const state = location.state as { from: string };

    if (state && state.from) {
      return state.from;
    }

    return "/";
  }, [location]);

  const [isLoading, setLoading] = useState(false);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    session
      .signIn()
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((e: Error) => {
        setLoading(false);
        showNotification({
          color: "red",
          title: "Unable to sign in",
          message: e.message ?? "An unknown error occurred",
        });
      });
  };

  return !session.user ? (
    <NotificationsProvider position="top-center">
      <form onSubmit={onSubmit}>
        <Stack spacing="xs">
          <TextInput
            type="email"
            placeholder="Email Address"
            disabled={isLoading}
            required
          />
          <PasswordInput placeholder="Password" disabled={isLoading} required />
          <Button type="submit" loading={isLoading}>
            Sign in
          </Button>
        </Stack>
      </form>
    </NotificationsProvider>
  ) : (
    <Navigate to={from} replace />
  );
}

export default PasswordLogin;
