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

  const profileImage = await ctx.input.file({
    label: "Profile Picture",
    multiple: true,
  });

  const age = await ctx.input.number({
    label: "Age",
    placeholder: "21",
  });
  ctx.log("age");
  console.log(age);

  return "User created.";
};

const signUp: Flow = {
  name: "Sign-up User",
  permission: "users.create",
  emoji: "📚",
  description:
    "A small example of what BusinessFlow can do in combination with Prisma.",
  run,
};

const deleteUser: Flow = {
  name: "Delete User",
  permission: "users.delete",
  emoji: "🚨",
  description: "Run this dangerous Flow to delete a user.",
  run,
};

const getUsers: Flow = {
  name: "List all Users",
  permission: "users.list",
  emoji: "🧰",
  description: "This is a handy flow to show all Users.",
  run,
};

const createTeam: Flow = {
  name: "Create Team",
  permission: "team.create",
  emoji: "💡",
  description: "To create a new team use this nifty flow.",
  run,
};

BusinessFlow.listen({
  signUp,
  deleteUser,
  createTeam,
  getUsers,
});
