const { SlashCommandBuilder } = require("@discordjs/builders");

// module.exports exports data in Node.js so you can require() it in other files
module.exports = {
  data: new SlashCommandBuilder() // :property(obj)  construct commandbuilder class
    .setName("ping")
    .setDescription("Replies with pong!"),
  async execute(interaction) {
    // :method which excecutes reply
    await interaction.reply("Pong!");
  },
};
