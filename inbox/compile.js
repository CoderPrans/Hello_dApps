const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'inbox.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

let info = {};

for(let contractName in output.contracts['inbox.sol']) {
  let byteCode = output.contracts['inbox.sol'][contractName].evm.bytecode.object;
  let abi = output.contracts['inbox.sol'][contractName].abi;
  info[contractName] = {byteCode, abi} 
}

module.exports = {...info};


