const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Slap another member")
    .addUserOption((option) =>
      option.setName("target").setDescription("Select a user").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply();
    const targetUser = interaction.options.getUser("target");

    const canvas = Canvas.createCanvas(960, 500);
    const context = canvas.getContext("2d");

    const background = await Canvas.loadImage("./Images/smith-slap.jpg");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(
      interaction.user.displayAvatarURL({ format: "jpg" })
    );
    const targetAvatar = await Canvas.loadImage(
      targetUser.displayAvatarURL({ format: "jpg" })
    );

    context.drawImage(avatar, 535, 70, 115, 115);
    context.drawImage(targetAvatar, 300, 50, 115, 115);

    const attachment = new MessageAttachment(canvas.toBuffer(), "slapped.png");
    await interaction.editReply({ 
        content: `${interaction.user.username} slapped <@${targetUser.id}>!`,
        files: [attachment] 
    });
  },
};
