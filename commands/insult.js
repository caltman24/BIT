const { SlashCommandBuilder } = require("@discordjs/builders");
const { fetchInsult } = require("../API/fetchInsult");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("insult")
    .setDescription("Get insulted by BIT"),
  async execute(interaction) {
    await fetchInsult().then((insult) => {
      interaction.reply(`<@${interaction.user.id}> ${insult.content}`);
    });
  },
};
