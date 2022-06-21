import { Group, useMantineTheme } from "@mantine/core";

import Logo from "./Logo";

function Brand() {
  const { colorScheme } = useMantineTheme();

  return (
    <Group position="apart">
      <Logo colorScheme={colorScheme} />
    </Group>
  );
}

export default Brand;
