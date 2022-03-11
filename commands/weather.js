const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();
const { fetchWeather } = require("../API/fetchweather");
const API_KEY = process.env.API_KEY;

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
    const zip = interaction.options.getInteger("zip").toString();
    const embedColor = "#00ff99"
    const embed = new MessageEmbed().setColor(embedColor);

    try {
      if (zip.length !== 5) {
        embed.setTitle("Invalid Input");
        embed.setDescription("Must contain 5 numbers");
        await interaction.reply({ embeds: [embed] });
      } else {
        await interaction.deferReply();
        await fetchWeather(zip).then((data) => {
          if (!data) interaction.editReply("No matching location");
          else {
            let weather = {
              location: {},
              current: {},
            };

            for (let i in data) {
              if (i === "location") {
                weather.location.name = data[i]["name"];
                weather.location.region = data[i]["region"];
                weather.location.country = data[i]["country"];
              } else if (i === "current") {
                weather.current.temp_c = data[i]["temp_c"].toString();
                weather.current.temp_f = data[i]["temp_f"].toString();

                weather.current.wind_mph = data[i]["wind_mph"].toString();
                weather.current.wind_dir = data[i]["wind_dir"];

                weather.current.feelslike_c = data[i]["feelslike_c"].toString();
                weather.current.feelslike_f = data[i]["feelslike_f"].toString();

                weather.current.conditionText = data[i]["condition"].text;
                weather.current.conditionIcon = data[i]["condition"].icon;
              }
            }

            const { name, region, country } = weather.location;
            const {
              temp_c,
              temp_f,
              wind_mph,
              wind_dir,
              feelslike_c,
              feelslike_f,
              conditionText,
              conditionIcon,
            } = weather.current;

            const degreeCode = "\u00B0";

            const locationString = `${name}, ${region}, ${country}`;
            const tempString = `${temp_f}${degreeCode}F (${temp_c}${degreeCode}C)\nFeels Like: ${feelslike_f}${degreeCode}F (${feelslike_c}${degreeCode}C)`;

            embed.setTitle(locationString);
            embed.setThumbnail("https:" + conditionIcon);
            embed.addFields(
              { name: "Temperature", value: tempString },
              {
                name: "Winds",
                value: `${wind_mph}mph ${wind_dir}`,
                inline: true,
              },
              { name: "Condition", value: conditionText, inline: true }
            );
            embed.setTimestamp();

            interaction.editReply({ embeds: [embed] });
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
