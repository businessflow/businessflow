import { useEffect, useRef, useState } from "react";
import { Button, Group, NumberInput, Stack } from "@mantine/core";

import { TextProps } from "@businessflow/types";
import ElementProps from "./ElementProps";

function Number({
  label,
  placeholder,
  required,
  onContinue,
  returnId,
}: TextProps & ElementProps) {
  const [value, setValue] = useState<number | undefined>(0);
  const el = useRef<HTMLInputElement>(null);

  useEffect(() => {
    el.current?.focus();
  }, []);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onContinue({
      __typeName: "NumberInputResponse",
      returnId,
      value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <NumberInput
          placeholder={placeholder ?? label}
          label={label}
          value={value}
          onChange={(value) => setValue(value)}
          ref={el}
          required
        />
        <Group>
          <Button color="dark" type="submit" disabled={required && !value}>
            Continue
          </Button>
          {!required && (
            <Button color="gray" variant="light">
              Skip
            </Button>
          )}
        </Group>
      </Stack>
    </form>
  );
}

export default Number;
