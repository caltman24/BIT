const fetch = require("cross-fetch");

module.exports = {
  async fetchInsult() {
    try {
      const res = await fetch(
        "https://evilinsult.com/generate_insult.php?lang=en&type=json"
      );
      if (res.ok) {
        const data = await res.json();
        const insult = {
          content: data.insult,
          number: data.number,
        };
        return insult;
      } else {
        console.log("Not Successful", res.status);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
