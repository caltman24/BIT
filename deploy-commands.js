// Used to register and update slash commands for bot
// **** run 'node deploy-commands.js' after every addition or edit ****

const fs = require("node:fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

// Global commands guarantee to update after an hour: Routes.applicationCommands(clientID)
// Guild commands update instantly: Routes.applicationGuildCommands(clientId, guildId)
// Use guild commands when under development
rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered guild application commands."))
  .catch(console.error);
