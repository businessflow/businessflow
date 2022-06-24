import {
  Button,
  Container,
  createStyles,
  Divider,
  Group,
  Stack,
  Title,
} from "@mantine/core";
import { BrandGoogle } from "tabler-icons-react";
import PasswordLogin from "../auth/PasswordLogin";

const useStyles = createStyles((theme) => ({
  fullHeight: {
    height: "100%",
    maxWidth: 350,
  },
}));

function LoginPage() {
  const { classes } = useStyles();
  return (
    <Container className={classes.fullHeight}>
      <Stack justify="center" className={classes.fullHeight}>
        <Title>Log in</Title>
        <PasswordLogin />
        <Divider />
        <Stack spacing="xs">
          <Button variant="outline">
            <Group>
              <BrandGoogle />
              Sign in with Google
            </Group>
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default LoginPage;
