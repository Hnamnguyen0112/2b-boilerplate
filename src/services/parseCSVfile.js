const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

module.exports = async () => {
  const filePath = path.join(__dirname, '../../data/transactions.csv');
  const records = [];

  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({
      delimiter: ',',
      from_line: 2,
      columns: ['timestamp', 'transactionType', 'token', 'amount']
    }));

  for await (const record of parser) {
    records.push(record);
  }

  return records;
}
