import { useState } from "react";
import { Modal, Button, Group, TextInput, Stack, Select } from "@mantine/core";

function NewUserModal() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        title="New User"
        opened={opened}
        onClose={() => setOpened(false)}
        overlayOpacity={0.25}
        centered
      >
        <form>
          <Stack>
            <TextInput label="Name" type="text" placeholder="Name" />
            <TextInput
              label="Email Address"
              type="email"
              placeholder="name@example.com"
            />
            <Select
              label="Group"
              value="member"
              data={[
                { value: "admin", label: "Admin" },
                { value: "developer", label: "Developer" },
                { value: "member", label: "Member" },
              ]}
            />
            <Group>
              <Button>Create</Button>
            </Group>
          </Stack>
        </form>
      </Modal>

      <Button onClick={() => setOpened(true)}>Add user</Button>
    </>
  );
}

export default NewUserModal;
