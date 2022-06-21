import { Context, Flow } from "@businessflow/types";
import BusinessFlow from "@businessflow/sdk";

const run = async (ctx: Context) => {
  // Get Name
  const name = await ctx.input.text({
    label: "Name",
    placeholder: "Doe",
    required: true,
  });
  ctx.log("name");
  ctx.log(name);

  const firstName = await ctx.input.text({
    label: "First name",
    placeholder: "John",
  });
  ctx.log("firstName");
  ctx.log(firstName);

  const age = await ctx.input.number({
    label: "Age",
    placeholder: "21",
  });
  ctx.log("age");
  console.log(age);

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

const signUp: Flow = {
  name: "Sign-up User",
  description:
    "A small example of what BusinessFlow can do in combination with Prisma. 📚",
  run,
};

const deleteUser: Flow = {
  name: "Delete User",
  description: "Run this dangerous Flow to delete a user. 🚨",
  run,
};

const createTeam: Flow = {
  name: "Create Team",
  description: "To create a new team use this nifty flow. 💡",
  run,
};

const getUsers: Flow = {
  name: "List all Users",
  description: "This is a handy flow to show all Users. 🧰",
  run,
};

BusinessFlow.listen({
  signUp,
  deleteUser,
  createTeam,
  getUsers,
});
