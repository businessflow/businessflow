import { Stack, Title } from "@mantine/core";
import useSession from "../data/useSession";

function AccountPage() {
  const session = useSession();

  return (
    <Stack>
      <Title>{session.user?.name}</Title>
    </Stack>
  );
}

export default AccountPage;
