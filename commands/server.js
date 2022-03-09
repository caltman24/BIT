const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server info"),
  async execute(interaction) {
    const embed = new MessageEmbed()
      .setColor("#00ff99")
      .setTitle(interaction.guild.name)
      .addField("Member Count:", interaction.guild.memberCount.toString())
    await interaction.reply(
      {embeds: [embed]}
    );
  },
};
