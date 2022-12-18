const axios = require('axios');

module.exports = async (coins) => {
  try {
    const { data } = await axios.get('https://min-api.cryptocompare.com/data/price', {
      params: {
        fsym: 'USD',
        tsyms: coins
      }
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};
