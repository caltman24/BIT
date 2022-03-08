const { SlashCommandBuilder } = require("@discordjs/builders");
require("dotenv").config();
const fetch = require("cross-fetch");
const API_KEY = process.env.API_KEY;

const fetchWeather = async (zip) => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${zip}&aqi=no`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      console.log("Not Successful", res.status);
    }
  } catch (error) {
    console.error(error);
  }
};

// BUGS: Invalid zip code returns undefined

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
    try {
      if (zip.length !== 5)
        await interaction.reply("Invalid Input: Must contain 5 numbers");
      else {
        await interaction.deferReply()
        await fetchWeather(zip).then((data) => {
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
          const windString = `Winds: ${wind_mph}mph ${wind_dir}`;
          const conditionString = `${conditionText} - ${conditionIcon}`;

          //interaction.reply(`\n${locationString}\n${tempString}\n${conditionString}\n${windString}\n`);

          interaction.editReply(`\n${locationString}\n${tempString}\n${conditionString}\n${windString}\n`)
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
