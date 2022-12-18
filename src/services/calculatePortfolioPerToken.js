const { getCurrentRate } = require('../api');
const { chain } = require('lodash');

const groupByToken = (transactions) => {
  return chain(transactions)
    .groupBy('token')
    .map((value, key) => ({ token: key, transactions: value}))
    .value();
}

const processTransactionsByToken = ({ token, transactions, rate }) => {
  const portfolio = transactions.reduce((total, record) => {
    switch (record.transactionType) {
      case 'DEPOSIT':
        return total += parseFloat(record.amount);
      case 'WITHDRAWAL':
        return total -= parseFloat(record.amount);
      default:
    }
  }, 0);

  return {
    token,
    value: portfolio / rate
  }
}

module.exports = async (transactions) => {
  let tokenGroups = groupByToken(transactions);
  const tokens = tokenGroups.map(item => item.token);

  const currentRates = await getCurrentRate(tokens.join())
  for (const token in currentRates) {
    tokenGroups = tokenGroups.map(group => {
      if (token === group.token) {
        group.rate = currentRates[token];
      }
      return group;
    })
  }

  return tokenGroups.map(processTransactionsByToken)
}
