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
      .setTitle("Developer Stats")
      .setDescription(interaction.commandId);

    const guildSize = interaction.client.guilds.cache.size.toString();
    const userSize = interaction.client.users.cache.size.toString();

    embed.addFields(
      { name: "Total Guilds:", value: guildSize },
      { name: "Total Users:", value: userSize },
      { name: "User ID:", value: interaction.user.id },
      { name: "Current Guild ID:", value: interaction.guild.id },
    );
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
