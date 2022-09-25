import { Group, Avatar, Text, Box, useMantineTheme } from "@mantine/core";

import useSession from "../data/useSession";
import { Link } from "react-router-dom";

function User() {
  const theme = useMantineTheme();
  const session = useSession();

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <Link to="/account">
        <Box
          sx={{
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          }}
        >
          <Group>
            <Avatar
              src="https://media-exp1.licdn.com/dms/image/D4D03AQHEqr15R_2eVg/profile-displayphoto-shrink_800_800/0/1664103784673?e=1669852800&v=beta&t=WYcxWqLq9psLkYlKtyuGQ_RpVZoojgAcqywvXRW6J3I"
              radius="xl"
            />
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {session.user?.name}
              </Text>
              <Text color="dimmed" size="xs">
                {session.user?.email}
              </Text>
            </Box>
          </Group>
        </Box>
      </Link>
    </Box>
  );
}

export default User;
