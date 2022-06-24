import { Button, Card, Container, SimpleGrid, Stack } from "@mantine/core";
import { Link } from "react-router-dom";

import useFlows from "../data/useFlows";

function FlowsPage() {
  const flows = useFlows();

  const flowsViews = Object.entries(flows).map(([flowName, flow]) => (
    <Card shadow="sm" p="lg" key={flowName}>
      <Stack className="h-full">
        <div>
          <h2>
            {flow.emoji} {flow.name}
          </h2>
          <p>{flow.description}</p>
        </div>

        <Link to={`/flow/${flowName}`} style={{ marginTop: "auto" }}>
          <Button
            variant="light"
            color="blue"
            fullWidth
            style={{ marginTop: 14 }}
          >
            Execute
          </Button>
        </Link>
      </Stack>
    </Card>
  ));

  return (
    <Container>
      <h1>Flows</h1>
      <SimpleGrid cols={3}>{flowsViews}</SimpleGrid>
    </Container>
  );
}

export default FlowsPage;
