import { useEffect, useRef, useState } from "react";
import { Button, Group, Stack, TextInput } from "@mantine/core";

import { TextProps } from "@businessflow/types";
import ElementProps from "./ElementProps";

function Text({
  label,
  placeholder,
  required,
  onContinue,
  returnId,
}: TextProps & ElementProps) {
  const [value, setValue] = useState("");
  const el = useRef<HTMLInputElement>(null);

  useEffect(() => {
    el.current?.focus();
  }, []);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onContinue({
      __typeName: "StringInputResponse",
      returnId,
      value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <TextInput
          placeholder={placeholder ?? label}
          label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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

export default Text;
