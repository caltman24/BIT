const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dev")
    .setDescription("Dev")
    .setDefaultPermission(false),
  async execute(interaction) {
    const embedColor = "#00ff99";
    const embed = new MessageEmbed()
      .setColor(embedColor)
      .setTitle("Developer Stats");

    const guildSize = interaction.client.guilds.cache.size.toString();
    const userSize = interaction.client.users.cache.size.toString();

    embed.addFields(
      { name: "Guild Cache Size:", value: guildSize },
      { name: "Users Cache Size:", value: userSize }
    );
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
