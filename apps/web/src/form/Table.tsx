import { Button, Group, Stack, Table as MantineTable } from "@mantine/core";
import { Download, ExternalLink } from "tabler-icons-react";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

function Table() {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (
    <Stack>
      <MantineTable>
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </MantineTable>
      <Group>
        <Button color="dark">Continue</Button>
        <Button color="gray" variant="light" leftIcon={<Download size={14} />}>
          Excel
        </Button>
        <Button color="gray" variant="light" leftIcon={<Download size={14} />}>
          CSV
        </Button>
        <Button color="gray" variant="light" leftIcon={<Download size={14} />}>
          PDF
        </Button>
        <Button
          color="gray"
          variant="light"
          leftIcon={<ExternalLink size={14} />}
        >
          Google Sheets
        </Button>
      </Group>
    </Stack>
  );
}

export default Table;
