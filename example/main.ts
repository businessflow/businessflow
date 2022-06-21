import { Context, Flow } from "../src/types";

const run = async (ctx: Context) => {
  // Get Name
  const name = await ctx.input.text({
    label: "Name",
    placeholder: "Doe",
  });
  ctx.log("name");
  ctx.log(name);

  const firstName = await ctx.input.text({
    label: "First name",
    placeholder: "John",
  });
  ctx.log("firstName");
  ctx.log(firstName);

  // Get team
  const team = await ctx.input.search({
    label: "Team",
    allowOther: true,
    async onSearch(value) {
      return [{ key: "", label: "" }];
    },
  });
  ctx.log(team);

  // Create db entry
  await ctx.loading.start();
  // prisma.user.create()
  await ctx.loading.complete();

  // Notify team
  await ctx.notify({
    title: "New user",
    description: `A new user named ${name} signed up for team ${team}.`,
  });

  // Show welcome message
  await ctx.output.text(`Hello ${name}!`);
};

const flow: Flow = {
  name: "User Sign-up with Prisma",
  description:
    "A small example of what BusinessFlow can do in combination with Prisma. 📚",
  run,
};

export default flow;
