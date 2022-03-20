/* 
  Required Permission(s): "MANAGE_MESSAGE"
*/
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions } = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearchat")
    .setDescription("Clears chat with specified amount (Max 100)")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("amount of messages to delete")
        .setRequired(true)
    )
    .addUserOption((option) => option.setName("target").setDescription("user")),

  async execute(interaction) {
    // Add embed
    const embedColor = "#00ff99";
    const embed = new MessageEmbed().setColor(embedColor);

    // get integer option amount to delete
    const amount = interaction.options.getInteger("amount");
    const user = interaction.options.getUser("target");
    if (amount > 0) {
      // Check if user has "MANAGE_MESSAGE" permission
      if (
        interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
      ) {
        // Check if target user exists
        if (user) {
          await interaction.channel.messages
            .fetch({ limit: amount })
            .then((messages) => {
              const userMessages = [];
              messages
                .filter((m) => m.author.id === user.id)
                .forEach((message) => userMessages.push(message));

              interaction.channel.bulkDelete(userMessages).then((msg) => {
                if (msg.size === 1) {
                  embed.setTitle(
                    `Deleted the last ${msg.size} message from ${user.tag}`
                  );
                  interaction.reply({
                    embeds: [embed],
                    ephemeral: true,
                  });
                } else {
                  embed.setTitle(
                    `Deleted the last ${msg.size} messages from ${user.tag}`
                  );
                  interaction.reply({
                    embeds: [embed],
                    ephemeral: true,
                  });
                }
              });
            });
        } else {
          // If no target user
          await interaction.channel
            .bulkDelete(amount) // Bulk delete messsages within the channel with given amount
            .then((messages) => {
              if (messages.size === 1) {
                embed.setTitle(`Deleted the last ${messages.size} message`);
                interaction.reply({
                  embeds: [embed],
                  ephemeral: true,
                });
              } else {
                embed.setTitle(`Deleted the last ${messages.size} messages`);
                interaction.reply({
                  embeds: [embed],
                  ephemeral: true,
                });
              }
            });
        }
      } else {
        embed.setDescription("You do not have permission to manage messages");
        await interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
      }
    } else {
      embed.setDescription("Entered amount must be greater than 0");
      await interaction.reply({
        embeds: [embed],
        ephemeral: true,
      });
    }
  },
};
