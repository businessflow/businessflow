import { createStyles, Group, Text } from "@mantine/core";
import useFlows from "../data/useFlows";

const useStyles = createStyles((theme) => ({
  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },
  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },
  collectionLink: {
    display: "block",
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

function FlowList() {
  const { classes } = useStyles();
  const flows = useFlows();

  const collectionLinks = Object.entries(flows).map(([flowName, flow]) => (
    <a
      href="/"
      onClick={(event) => event.preventDefault()}
      key={flowName}
      className={classes.collectionLink}
    >
      <span style={{ marginRight: 9, fontSize: 16 }}>{flow.emoji}</span>{" "}
      {flow.name}
    </a>
  ));

  return (
    <>
      <Group className={classes.collectionsHeader} position="apart">
        <Text size="xs" weight={500} color="dimmed">
          Flows
        </Text>
      </Group>
      <div className={classes.collections}>{collectionLinks}</div>
    </>
  );
}

export default FlowList;
