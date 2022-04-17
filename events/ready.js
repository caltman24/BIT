module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    require("dotenv").config();
    console.log(`Ready! Logged in as ${client.user.tag}`);
    client.user.setActivity("/help", { type: "LISTENING" });

    // Set permissions to all commands
    const fullPermissions = require("../permissions.js");
    const guildId = process.env.GUILD_ID;
    await client.guilds.cache
      .get(guildId)
      ?.commands.permissions.set({ fullPermissions });
  },
};
