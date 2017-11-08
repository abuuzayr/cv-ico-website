const Web3 = require('web3');

function connect(uri) {
  return new Web3(new Web3.providers.HttpProvider(uri));
}

function getBlockNumber(web3) {
  web3.eth.getBlockNumber((err, res) => res);
}

module.exports = {
  connect,
  getBlockNumber,
};
