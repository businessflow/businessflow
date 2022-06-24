import { useState } from "react";
import { Upload } from "tabler-icons-react";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import { createStyles, Group, InputWrapper, Stack, Text } from "@mantine/core";
import { OptionalFileProps, RequiredFileProps } from "@businessflow/types";

import ElementProps from "./ElementProps";
import Actions from "./Actions";

const useStyles = createStyles((theme) => ({
  preview: {
    height: 80,
    width: 80,
  },
}));

function File({
  label,
  onContinue,
  returnId,
}: (OptionalFileProps | RequiredFileProps) & ElementProps) {
  const [value, setValue] = useState<File>();
  const [isComplete, setComplete] = useState(false);

  const { classes } = useStyles();

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setComplete(true);
    onContinue({
      returnId,
      value: "",
      __typeName: "InputResponse",
      type: "file",
    });
  };

  const onDrop = async (files: File[]) => {
    for (const file of files) {
      setValue(file);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack>
        <div>
          <InputWrapper label={label}>
            <Dropzone
              style={{ borderWidth: 1, borderStyle: "solid" }}
              onDrop={onDrop}
              accept={[MIME_TYPES.png]}
              maxSize={30 * 1024 ** 2}
              disabled={isComplete}
            >
              {(status) => (
                <div style={{ pointerEvents: "none" }}>
                  <Stack my="md" spacing="xs">
                    <Group mb="md" position="center">
                      {value ? (
                        <img
                          src={URL.createObjectURL(value)}
                          alt={value.name}
                          className={classes.preview}
                        />
                      ) : (
                        <Upload size={38} strokeWidth={1} />
                      )}
                    </Group>
                    <Text align="center" weight={700} size="lg">
                      {value ? value.name : "Upload a file"}
                    </Text>
                    <Text align="center" size="sm" color="dimmed">
                      Select a file or drag and drop
                    </Text>
                  </Stack>
                </div>
              )}
            </Dropzone>
          </InputWrapper>
        </div>
        <Actions value={value} isComplete={isComplete} isRequired={false} />
      </Stack>
    </form>
  );
}

export default File;
