module.exports = {
    name: "guildCreate",
    async execute(guild) {
      const { Permissions } = require("discord.js");
      // Get bot from members cache
      const bot = await guild.members.cache.find(
        (member) => member.user.username === "BIT_TEST" && member.user.bot
      );
  
      // Create a new role with admin permissions
      const newRole = await guild.roles.create({
        name: "Bot",
        color: "#00ff99",
        permissions: [Permissions.FLAGS.ADMINISTRATOR],
      });
  
      // Add role to the bot
      bot.roles.add(newRole);
  
      // Set permissions to all commands
      const fullPermissions = require("../permissions.js");
      await guild?.commands.permissions.set({ fullPermissions });
  
      // Send greeting message on guild join
      await guild.systemChannel?.send(
        "Thanks for inviting me, type `/help` to get started!"
      );
  
      // Log
      console.log(
        `[ Joined Guild ] {\n` +
          `    Guild: ${guild.name}\n` +
          `    GuildID: ${guild.id}\n` +
          `}`
      );
    },
  };