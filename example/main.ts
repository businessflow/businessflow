import { Flow } from "../src/types";

const flow: Flow = {
  name: "Example",
  async run(ctx) {
    // Get Name
    const name = await ctx.input.text({
      label: "Name",
      placeholder: "John Doe",
    });

    // Get team
    const team = await ctx.input.search({
      label: "Team",
      async onSearch(value) {
        return [{ key: "", label: "" }];
      },
    });

    // Create db entry
    await ctx.loading.start();
    // prisma.user.create()
    await ctx.loading.complete();

    // Notify team
    await ctx.notify({
      title: "New user",
      description: `A new user named ${name} signed up for team ${team}.`,
    });

    // Return
    await ctx.output.text(`Hello ${name}!`);
  },
};

export default flow;
