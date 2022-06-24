import { Button, Group } from "@mantine/core";

function Actions({
  isRequired,
  isComplete,
  value,
}: {
  isRequired: boolean;
  isComplete: boolean;
  value: unknown | undefined | null;
}) {
  return !isComplete ? (
    <Group>
      <Button color="dark" type="submit" disabled={!value}>
        Continue
      </Button>
      {!isRequired && !value && (
        <Button color="gray" variant="light">
          Skip
        </Button>
      )}
    </Group>
  ) : null;
}

export default Actions;
