const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user info"),
  async execute(interaction) {
    const user = interaction.user;
    
    await interaction.reply({
      content:
        `User ID: ${user.id} #${user.discriminator}\n` +
        `User created at: ${user.createdAt}`,
      ephemeral: true,
    });
  },
};
