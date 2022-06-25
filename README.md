# BusinessFlow

BusinessFlow is a small but very handy tool for creating internal apps using TypeScript. It allows you to get user input without worrying about UI, authentication or API communication.
BusinessFlow will create an UI based on your `Flow`. Need a string from the user? Just use `ctx.input.text()`. Need a number? Use `ctx.input.number()`. BusinessFlow will show the input fields to the user and return their values to your script.

## Example

BusinessFlow is built on Node.js and TypeScript and is nothing more than a npm package. To build a BusinessFlow App create a TypeScript file (e.g. `main.ts`), install the BusinessFlow SDK and start scripting. You can use any other npm package, like Prisma in the following example:

```typescript
import BusinessFlow from "@businessflow/sdk";
import { Context, Flow } from "@businessflow/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run(ctx: Context) {
  // Get Name
  const name = await ctx.input.text({
    label: "Name",
    placeholder: "New Team",
    required: true,
  });

  // Get icon
  const iconUrl = await ctx.input.file({
    label: "Icon",
    required: true,
  });

  // Create db entry
  await ctx.loading.start();
  await prisma.team.create({
    data: {
      name,
    },
  });
  await ctx.loading.complete();

  // Notify
  await ctx.notify({
    title: "New team",
    description: `A new team named ${name} has been created.`,
  });

  // Show success message
  await ctx.output.text(`Successfully created ${name}.`);
}

const createTeam: Flow = {
  emoji: "💡",
  name: "Create Team",
  permission: "team.create",
  description: "To create a new team use this nifty flow.",
  run,
};

BusinessFlow.listen({
  createTeam,
});
```

> ts-node main.ts

## Help developing BusinessFlow

Install dependencies:

> npm i

Start development servers:

> npx turbo run develop
