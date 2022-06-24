import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { AppShell, Box, Center, Loader, Navbar } from "@mantine/core";

import Brand from "./Brand";
import FlowList from "./FlowList";
import MainLinks from "./MainLinks";
import User from "./User";

function Shell() {
  return (
    <AppShell
      navbar={
        <Navbar width={{ base: 300 }} p="xs">
          <Navbar.Section mt="xs">
            <Box
              sx={(theme) => ({
                paddingLeft: theme.spacing.xs,
                paddingRight: theme.spacing.xs,
                paddingBottom: theme.spacing.lg,
                borderBottom: `1px solid ${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[2]
                }`,
              })}
            >
              <Brand />
            </Box>
          </Navbar.Section>
          <Navbar.Section mt="md">
            <MainLinks />
          </Navbar.Section>
          <Navbar.Section grow mt="md">
            <FlowList />
          </Navbar.Section>
          <Navbar.Section>
            <User />
          </Navbar.Section>
        </Navbar>
      }
    >
      <Suspense
        fallback={
          <Center>
            <Loader />
          </Center>
        }
      >
        <Outlet />
      </Suspense>
    </AppShell>
  );
}

export default Shell;
