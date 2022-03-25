const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const fs = require("node:fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("List of all commands"),

  async execute(interaction) {
    // Embed Pages
    const embedColor = "#00ff99";
    const embeds = [];
    const pages = {}; // { userId: pageNumber }
    // create 2 message embeds and push to embeds[]
    for (let i = 1; i <= 2; i++) {
      embeds.push(
        new MessageEmbed().setColor(embedColor).setFooter({ text: `Page ${i}` })
      );
      if (i === 1) {
        embeds[i - 1].setTitle("List of commands: ");
      }
    }

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
      allCommands.push(command.data.toJSON());
    }

    // amount of commands per page
    const pageSize = 5;

    // split allCommands[] into arrays with lengths of pageSize
    const commandPages = [];
    for (let i = 0; i < allCommands.length; i += pageSize) {
      commandPages.push(allCommands.slice(i, i + pageSize));
    }

    // Page setup
    const id = interaction.user.id;
    const channel = interaction.channel;
    pages[id] = pages[id] || 0;

    const embed = embeds[pages[id]];
    let collector;

    // loop through pages to display command data to embeds
    // Page 1
    for (let i = 0; i < commandPages[0].length; i++) {
      const command = commandPages[0][i];
      embeds[0].addFields({
        name: `/${command.name}`,
        value: command.description,
      });
    }
    // Page 2
    for (let i = 0; i < commandPages[1].length; i++) {
      const command = commandPages[1][i];
      embeds[1].addFields({
        name: `/${command.name}`,
        value: command.description,
      });
    }

    const filter = (i) => id === i.user.id;
    const time = 1000 * 60 * 5;

    // Reply
    reply = await interaction.reply({
      embeds: [embed],
      components: [getRow(id)],
      fetchReply: true,
    });

    // Button Event listener
    collector = channel.createMessageComponentCollector({ filter, time });

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

      if (reply) {
        reply.edit({
          embeds: [embeds[pages[id]]],
          components: [getRow(id)],
        });
      } else {
        interaction.editReply({
          embeds: [embeds[pages[id]]],
          components: [getRow(id)],
        });
      }
    });
  },
};
