import React, { useState } from "react";
import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";

function PasswordLogin() {
  const [isLoading, setLoading] = useState(false);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
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
  );
}

export default PasswordLogin;
