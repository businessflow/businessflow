import { Box, Group, Stack, Text, Title } from "@mantine/core";
import NewUserModal from "../modal/NewUserModal";

const users = [
  {
    name: "Benedict",
    email: "me@bene.dev",
  },
  {
    name: "Alex",
    email: "me@bene.dev",
  },
  {
    name: "Max",
    email: "me@bene.dev",
  },
];

function UsersPage() {
  return (
    <Stack>
      <Group position="apart">
        <Title>Users</Title>
        <NewUserModal />
      </Group>

      {users.map((user, i) => (
        <Box key={i} my="sm">
          <Text>{user.name}</Text>
          <Text color="dimmed">{user.email}</Text>
        </Box>
      ))}
    </Stack>
  );
}

export default UsersPage;
