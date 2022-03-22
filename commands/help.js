const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List of all commands"),
  async execute(interaction) {
    const embedColor = "#00ff99";
    const embed = new MessageEmbed()
      .setColor(embedColor)
      .setTitle("HELP")
      .setDescription("List of commands go here")
    await interaction.reply({embeds: [embed]});
  },
};
