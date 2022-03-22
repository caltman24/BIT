const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Clears whole channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Select channel to purge")
        .addChannelType(0) //GUILD_TEXT = 0
        .setRequired(true)
    ),
  async execute(interaction) {
    const embedColor = "#00ff99";
    const embed = new MessageEmbed().setColor(embedColor);
    /*
    if user has permission:
      save target channel position
      clone target channel at current position
      delete target channel
    */
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      const targetChannel = interaction.options.getChannel("channel");
      const channelPosition = targetChannel.position;

      embed.setTitle("Purged:");
      embed.setDescription(`#${targetChannel.name}`);

      targetChannel.clone({ position: channelPosition });
      targetChannel
        .delete()
        .then(interaction.reply({ embeds: [embed] }));
    } else {
      // If member doesn't have permissiom
      embed.setDescription("You do not have permission to manage channels");
      await interaction.reply({
        embeds: [embed],
      });
    }
  },
};
