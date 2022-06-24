import { useEffect, useRef, useState } from "react";
import { NumberInput, Stack } from "@mantine/core";

import { OptionalNumberProps, RequiredNumberProps } from "@businessflow/types";
import ElementProps from "./ElementProps";
import Actions from "./Actions";

function Number({
  label,
  placeholder,
  required,
  onContinue,
  returnId,
}: (OptionalNumberProps | RequiredNumberProps) & ElementProps) {
  const [value, setValue] = useState<number | undefined>(0);
  const [isComplete, setComplete] = useState(false);
  const el = useRef<HTMLInputElement>(null);

  useEffect(() => {
    el.current?.focus();
  }, []);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setComplete(true);
    onContinue({
      __typeName: "InputResponse",
      type: "number",
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
        <Actions
          value={value}
          isComplete={isComplete}
          isRequired={required ?? false}
        />
      </Stack>
    </form>
  );
}

export default Number;
