const fs = require("node:fs"); // Node's native file system
const { Client, Collection, Intents } = require("discord.js");
require("dotenv").config();

// Declare client and bot intents
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

// Collection is a class that extends JS native map class to include more functionality
client.commands = new Collection();

// fs.readdirSync() method will return an array of all the file names in a directory
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

// return array of event file names
const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

// command handler
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command); //Collection.set(key, value)
}
// event handler
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.TOKEN); // log in bot

/* ************** IDEAS **************
+ Settings
  -set degree type
  -set "default" location

+ COMMANDS
 - /settings (degree or location) EX: /settings degree F/C or /settings location 46345
 - /weather (optional: zip) -> return current weather
 - /forecast (optional: zip) -> display next 3 days
   > if /weather or /forecast without zip. Then pass in default
*/
