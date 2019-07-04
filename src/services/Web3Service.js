import dotenv from 'dotenv';
import HDWalletProvider from 'truffle-hdwallet-provider';
import Web3 from 'web3';
import ganache from 'ganache-cli';

const bytecodeFile = require('../contracts/bytecode.json');
const abiFile = require('../contracts/abi.json');

class Web3Service {
  constructor() {
    dotenv.config();
    const ganacheDir = process.env.GANACHE_DIR;
    const rinkebyMnemonic = process.env.RINKEBY_MNEMONIC;
    // This is for rinkeby
    if (rinkebyMnemonic !== 'MNEMONIC') {
      this.walletProvider = new HDWalletProvider(
        `${rinkebyMnemonic}`,
        'https://rinkeby.infura.io/v3/29a56dc454464b7c9f5045f8682913f1',
      );
      this.web3Provider = new Web3(this.walletProvider, null, {
        transactionConfirmationBlocks: 10,
      });
    } else {
      // This is for ganache.
      this.web3Provider = new Web3(
        new Web3.providers.HttpProvider(`${ganacheDir}`),
      );
    }
  }

  getAccounts = async () => this.web3Provider.eth.getAccounts();

  deployContract = async (
    account,
    item,
    auctionName,
    auctionDescription,
    auctionBasePrice,
    auctionMinimumPrice,
    auctionMaximumPrice,
    maxBidsCount,
    privateData,
  ) => {
    const bytecodeObject = bytecodeFile.bytecode;
    const result = await new this.web3Provider.eth.Contract(abiFile)
      .deploy({
        data: `0x${bytecodeObject.object}`,
        arguments: [
          item,
          auctionName,
          auctionDescription,
          auctionBasePrice,
          auctionMinimumPrice,
          auctionMaximumPrice,
          maxBidsCount,
          privateData,
        ],
      })
      .send({ gas: '3000000', from: account, value: 0 });
    return result.options.address;
  };

  getContract = address => {
    const contract = new this.web3Provider.eth.Contract(abiFile, address);
    return contract;
  };
}

export default new Web3Service();
