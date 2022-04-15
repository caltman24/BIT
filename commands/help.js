const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fs = require("node:fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List of all commands"),

  async execute(interaction) {
    // Button Componets Row
    const getRow = (id) => {
      const row = new MessageActionRow().addComponents([
        new MessageButton()
          .setCustomId("back")
          .setLabel("Back")
          .setEmoji("⬅️")
          .setStyle("PRIMARY")
          .setDisabled(pages[id] === 0), // Disable back button if at page 0
        new MessageButton()
          .setCustomId("next")
          .setLabel("Next")
          .setEmoji("➡️")
          .setStyle("PRIMARY")
          .setDisabled(pages[id] === embeds.length - 1), // Disable next button if at last page
      ]);
      return row;
    };

    // Loop through command directory to get all command data (similar to command handling)
    const allCommands = []; // allCommands[] contain data for all comands (name & description)
    const commandFiles = fs
      .readdirSync("./commands")
      .filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./${file}`);
      if (
        command.data.name !== "dev" &&
        command.data.defaultPermission === undefined
      ) {
        allCommands.push(command.data.toJSON());
      }
    }

    // amount of commands per page
    const pageSize = 5;
    // split allCommands[] into arrays with lengths of pageSize
    const commandPages = [];
    for (let i = 0; i < allCommands.length; i += pageSize) {
      commandPages.push(allCommands.slice(i, i + pageSize));
    }

    // Embed Pages
    const embedColor = "#00ff99";
    const embeds = [];
    const pages = {}; // { userId: pageNumber }
  
    // create an embed for each commandPage and push the embeds into embeds[] array
    for (let i = 1; i <= commandPages.length; i++) {
      embeds.push(
        new MessageEmbed().setColor(embedColor).setFooter({ text: `Page ${i}` })
      );
      if (i === 1) {
        embeds[i - 1].setTitle("List of commands: ");
      }
    }

   
    // loop through pages to display command data to embeds
    for (let i = 0; i < commandPages.length; i++) {
      for (let j = 0; j < commandPages[i].length; j++) {
        const command = commandPages[i][j];
        embeds[i].addFields({
          name: `/${command.name}`,
          value: command.description,
        });
      }
    }
 
    // Page setup
    const id = interaction.user.id;
    pages[id] = pages[id] || 0;

    const embed = embeds[pages[id]];
    let collector;

    // Reply
    reply = await interaction.reply({
      embeds: [embed],
      components: [getRow(id)],
      fetchReply: true,
      ephemeral: true,
    });

    // Button Event listener
    const filter = (i) => id === i.user.id;
    collector = reply.createMessageComponentCollector({ filter });

    collector.on("collect", (btnInteraction) => {
      if (!btnInteraction) {
        return;
      }
      btnInteraction.deferUpdate();

      if (
        btnInteraction.customId === "back" &&
        btnInteraction.customId === "next"
      )
        return;

      if (btnInteraction.customId === "back" && pages[id] > 0) {
        --pages[id];
      } else if (
        btnInteraction.customId === "next" &&
        pages[id] < embeds.length - 1
      ) {
        ++pages[id];
      }

      interaction.editReply({
        embeds: [embeds[pages[id]]],
        components: [getRow(id)],
        ephemeral: true,
      });
    });
  },
};
