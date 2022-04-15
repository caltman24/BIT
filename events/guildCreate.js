module.exports = {
    name: "guildCreate",
    async execute(guild) {
        guild.systemChannel.send("Thanks for inviting me, type `/help` to get started!")
        console.log(
            `[ Joined Guild ] {\n` +
              `    Guild: ${guild.name}\n` +
              `    GuildID: ${guild.id}\n` +
              `}`
          );
        
    }
}