const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("measure")
    .setDescription("Measures the johnson"),
  async execute(interaction) {
    const getRandomNum = (max) => Math.floor(Math.random() * max) + 1;
    const embedColor = "#00ff99"
    const embed = new MessageEmbed().setColor(embedColor);

    let base = ["8", "D"];
    let randomNum = getRandomNum(12);

    for (let i = 1; i <= randomNum; i++) {
      base.splice(1, 0, "=");
    }

    const result = base.join("");
    embed.setTitle(result);

    if (randomNum <= 2) {
      embed.setDescription("LMAO");
    } else if (randomNum > 2 && randomNum <= 4) {
      embed.setDescription("Tic Tac Chump");
    } else if (randomNum > 4 && randomNum <= 6) {
      embed.setDescription("Average.....");
    } else embed.setDescription("Damn u packin!");

    await interaction.reply({ embeds: [embed] });
  },
};
