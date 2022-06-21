import { Link, useParams } from "react-router-dom";
import {
  AppShell,
  Button,
  Container,
  Group,
  Header,
  LoadingOverlay,
  Stack,
  Title,
} from "@mantine/core";

import Brand from "../layout/Brand";
import useFlows from "../data/useFlows";
import useFlowMessageHandler from "../logic/handleMessage";

function FlowPage() {
  const flowName = useParams().flowName!;
  const flows = useFlows();
  const flow = flows[flowName];

  const { steps, loading } = useFlowMessageHandler(flowName);

  return (
    <AppShell
      header={
        <Header height="100%" p="xs">
          <Group position="apart">
            <Brand />
            <Link to="/">
              <Button color="red" variant="subtle">
                Cancel Transaction
              </Button>
            </Link>
          </Group>
        </Header>
      }
    >
      <Container style={{ position: "relative" }}>
        <LoadingOverlay visible={loading !== 0} />
        <Stack>
          <Title>{flow.name}</Title>
          {steps.map((step) => (
            <div key={step.id}>{step.element}</div>
          ))}
        </Stack>
      </Container>
    </AppShell>
  );
}

export default FlowPage;
