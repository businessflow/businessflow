import { useEffect, useRef } from "react";
import { Stack, TextInput } from "@mantine/core";
import { OptionalTextProps, RequiredTextProps } from "@businessflow/types";

import ElementProps from "./ElementProps";
import Actions from "./Actions";
import useInput from "./useInput";

function Text({
  label,
  placeholder,
  required,
  onContinue,
  returnId,
}: (OptionalTextProps | RequiredTextProps) & ElementProps) {
  const { value, setValue, isComplete, setComplete } = useInput<string>("");
  const el = useRef<HTMLInputElement>(null);

  useEffect(() => {
    el.current?.focus();
  }, []);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setComplete(true);
    onContinue({
      __typeName: "InputResponse",
      type: "text",
      returnId,
      value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <TextInput
          ref={el}
          label={label}
          placeholder={placeholder ?? label}
          disabled={isComplete}
          value={value}
          onChange={(e) => setValue(e.target.value)}
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

export default Text;
