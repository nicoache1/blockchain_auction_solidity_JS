import dotenv from 'dotenv';
// eslint-disable-next-line no-unused-vars
import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';
// eslint-disable-next-line no-unused-vars
import ganache from 'ganache-cli';

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

  getAccounts = async () => this.web3.eth.getAccounts();

  getContract = async abiFile => this.web3.eth.Contract(abiFile);
}

export default new Web3Service();
