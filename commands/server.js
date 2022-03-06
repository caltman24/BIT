const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info"),
  async execute(interaction) {
    await interaction.reply(
      `Server Name: ${interaction.guild.name}\nMember Count: ${interaction.guild.memberCount}`
    );
  },
};
