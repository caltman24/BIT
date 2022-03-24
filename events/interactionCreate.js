module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;
    try {
      console.log(
        `[ Command Interaction ] {\n` +
          `    Command: /${interaction.commandName}\n` +
          `    User: ${interaction.user.tag},\n` +
          `    UserId: ${interaction.user.id},\n` +
          `    Guild: ${interaction.guild},\n` +
          `    Channel: #${interaction.channel.name},\n` +
          `}`
      );
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
