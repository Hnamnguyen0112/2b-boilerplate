const { parseCSVfile, calculatePortfolioPerToken } = require('./src/services');

(async () => {
  try {
    const transactions = await parseCSVfile();
    const result = await calculatePortfolioPerToken(transactions);

    console.log(result);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})()
