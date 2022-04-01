/* 
  Required Permission(s): ["MANAGE_MESSAGES", "MANAGE_CHANNELS"]
*/

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
  permissions: new Permissions([
    Permissions.FLAGS.MANAGE_MESSAGES,
    Permissions.FLAGS.MANAGE_CHANNELS,
  ]).toArray(),

  async execute(interaction) {
    const embedColor = "#00ff99";
    const embed = new MessageEmbed().setColor(embedColor);

    const targetChannel = interaction.options.getChannel("channel");
    const channelPosition = targetChannel.position;

    embed.setTitle("Purged:");
    embed.setDescription(`#${targetChannel.name}`);

    targetChannel.clone({ position: channelPosition });
    targetChannel.delete().then(interaction.reply({ embeds: [embed] }));
  },
};
