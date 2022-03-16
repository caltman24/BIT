const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clearchat")
    .setDescription("Clears chat with specified amount (Max 100)")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("amount of messages to delete")
        .setRequired(true)
    ),
  async execute(interaction) {
    // get integer option amount to delete
    const amount = interaction.options.getInteger("amount");

    await interaction.channel
      .bulkDelete(amount) // Bulk delete messsages within the channel with given amount
      .then((messages) => {
        if (messages.size === 1)
          interaction.reply({
            content: `Deleted ${messages.size} Message`,
            ephemeral: true,
          });
        else {
          interaction.reply({
            content: `Deleted ${messages.size} Messages`,
            ephemeral: true,
          });
        }
      })
      .catch(console.error);
  },
};
