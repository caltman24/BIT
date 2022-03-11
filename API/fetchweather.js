require("dotenv").config();
const fetch = require("cross-fetch");
const API_KEY = process.env.API_KEY;

module.exports = {
  async fetchWeather(zip) {
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
  },
};
