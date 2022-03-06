const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("measure")
    .setDescription("Measures the johnson"),
  async execute(interaction) {
    const getRandomNum = (max) => Math.floor(Math.random() * max) + 1;

    let base = ["8", "D"];
    let randomNum = getRandomNum(12);

    for (let i = 1; i <= randomNum; i++) {
      base.splice(1, 0, "=");
    }

    const result = base.join("");

    if (randomNum <= 2) await interaction.reply(`${result}\nLMAO`);
    else if (randomNum > 2 && randomNum <= 4)
      await interaction.reply(`${result}\nTic Tac Chump`);
    else if (randomNum > 4 && randomNum <= 7)
      await interaction.reply(`${result}\nAverage.....`);
    else await interaction.reply(`${result}\nDamn u packin!`);
  },
};
