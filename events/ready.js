module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setActivity("/help", { type: "LISTENING" });

    // Set permissions to all commands
    const fullPermissions = require("../permissions.js");
    await client.guilds.cache
      .get("543323141678563358")
      ?.commands.permissions.set({ fullPermissions });
  },
};
