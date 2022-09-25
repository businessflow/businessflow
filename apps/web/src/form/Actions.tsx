import { Button, Group } from "@mantine/core";

function Actions<T>({
  isRequired,
  isComplete,
  value,
}: {
  isRequired: boolean;
  isComplete: boolean;
  value: T | undefined | null;
}) {
  return !isComplete ? (
    <Group>
      <Button
        color="dark"
        type="submit"
        disabled={value === undefined || value === null}
      >
        Continue
      </Button>
      {!isRequired && (value === undefined || value === null) && (
        <Button color="blue" variant="light">
          Skip
        </Button>
      )}
    </Group>
  ) : null;
}

export default Actions;
