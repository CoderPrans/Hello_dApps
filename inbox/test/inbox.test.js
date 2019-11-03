const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const {Inbox} = require('../compile.js');

let accounts;
let instance;

const INITIAL_STRING = 'Hi there!'

beforeEach(async () => {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // use one of those accounts to 
  // deploy the contracts
  let {abi, byteCode} = Inbox;
  instance = await new web3.eth.Contract(abi)
    .deploy({ data: byteCode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(instance.options.address);
  });

  it('has a default message', async () => {
    const message = await instance.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it('can change message', async () => {
    const NEW_STRING = 'Bye now!';
    await instance.methods.setMessage(NEW_STRING)
      .send({ from: accounts[1] });
    const message = await instance.methods.message().call();
    assert.equal(message, NEW_STRING);
  });
});

