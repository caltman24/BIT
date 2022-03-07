const { SlashCommandBuilder } = require("@discordjs/builders");
require("dotenv").config();
const fetch = require("cross-fetch");
const API_KEY = process.env.API_KEY;

const fetchWeather = async (zip) => {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${zip}&aqi=no`
    );
    if (res.ok) {
      console.log(`Status: ${res.status}\nSuccess`);
      const data = await res.json();
      return data;
    } else {
      console.log("Not Successful", res.status);
    }
  };

module.exports = {
  data: new SlashCommandBuilder()
    .setName("weather")
    .setDescription("Returns current weather in given zip code")
    .addIntegerOption((option) =>
      option
        .setName("zip")
        .setDescription("zip code to location")
        .setRequired(true)
    ),
  async execute(interaction) {
    const zip = interaction.options.getInteger("zip");
    interaction.reply("Work in progress")
  },
};
