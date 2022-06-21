import React from "react";
import { Database, Users, Settings, PlayerPlay } from "tabler-icons-react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";

interface MainLinkProps {
  to: string;
  icon: React.ReactNode;
  color: string;
  label: string;
}

function MainLink({ to, icon, color, label }: MainLinkProps) {
  return (
    <Link to={to}>
      <UnstyledButton
        sx={(theme) => ({
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
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

const data = [
  { to: "/", icon: <PlayerPlay size={16} />, color: "blue", label: "Flows" },
  {
    to: "/transactions",
    icon: <Database size={16} />,
    color: "teal",
    label: "Transactions",
  },
  { to: "/users", icon: <Users size={16} />, color: "violet", label: "Users" },
  {
    to: "/settings",
    icon: <Settings size={16} />,
    color: "grape",
    label: "Settings",
  },
];

function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

export default MainLinks;
