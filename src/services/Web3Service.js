import dotenv from 'dotenv';
import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';
import ganache from 'ganache-cli';

const bytecodeFile = require('../contracts/bytecode.json');
const abiFile = require('../contracts/abi.json');

class Web3Service {
  constructor() {
    dotenv.config();
    // TODO: This is for rinkeby add address to .env file etc.
    // this.wallerProvider = new HDWalletProvider(
    //   '{{MNEMONIC}}',
    //   'https://rinkeby.infura.io/v3/29a56dc454464b7c9f5045f8682913f1',
    // );
    // const web3 = new Web3(wallerProvider);

    // This is for ganache.
    this.web3Provider = new Web3(
      new Web3.providers.HttpProvider('HTTP://127.0.0.1:8545'),
    );
  }

  getAccounts = async () => this.web3Provider.eth.getAccounts();

  deployContract = async account => {
    const bytecodeObject = bytecodeFile.bytecode;
    const result = await new this.web3Provider.eth.Contract(abiFile)
      .deploy({
        data: `0x${bytecodeObject.object}`,
        arguments: [
          'url',
          'testAuction',
          'description',
          100,
          1000,
          2000,
          10,
          false,
        ],
      })
      .send({ gas: '3000000', from: account, value: 0 });
    return result.options.address;
  };

  getContract = address => {
    const contract = this.web3Provider.eth.Contract(abiFile, address);
    return contract;
  };
}

export default new Web3Service();
