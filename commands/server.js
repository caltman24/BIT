const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info"),
  async execute(interaction) {
    const embedColor = "#00ff99"
    const embed = new MessageEmbed()
      .setColor(embedColor)
      .setTitle(interaction.guild.name)
      .addField("Member Count:", interaction.guild.memberCount.toString())
    await interaction.reply(
      {embeds: [embed]}
    );
  },
};
