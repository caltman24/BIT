module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      // Check if command has permissions
      if (command.permissions && command.permissions.length > 0) {
        // Check if member does not have permissions
        if (!interaction.member.permissions.has(command.permissions)) {
          console.log(command.permissions);
          return await interaction.reply({
            content: `You do not have permission to use this command.\nRequired: ${command.permissions.join(
              " | "
            )}`,
            ephemeral: true,
          });
        }
      }
      await command.execute(interaction);
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
