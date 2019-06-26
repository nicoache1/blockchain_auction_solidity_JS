import path from 'path';
import fs from 'fs';
import solc from 'solc';
import Web3Service from '../../services/Web3Service';
import {
  WriteContractsAbiFile,
  WriteContractsBytecodeFile,
} from '../../utils/utils';
import { errorStrings } from './errorStrings';

class ContractController {
  constructor() {
    this.contractAddress;
  }

  compileContract = () => {
    const contractPath = path.resolve('src', 'contracts', 'auction.sol');

    const compilerInput = {
      language: 'Solidity',
      sources: {
        Auction: { content: fs.readFileSync(contractPath, 'utf8') },
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode'],
          },
        },
      },
    };

    const compiledContract = JSON.parse(
      solc.compile(JSON.stringify(compilerInput)),
    );

    if (compiledContract.errors) {
      compiledContract.errors.forEach(err => console.log(err.formattedMessage));
    }

    WriteContractsAbiFile(compiledContract);
    WriteContractsBytecodeFile(compiledContract);
  };

  deployContract = async (
    item,
    auctionName,
    auctionDescription,
    auctionBasePrice,
    auctionMinimumPrice,
    auctionMaximumPrice,
    maxBidsCount,
    privateData,
  ) => {
    try {
      const accounts = await Web3Service.getAccounts();
      const contract = await Web3Service.deployContract(
        accounts[0],
        item,
        auctionName,
        auctionDescription,
        auctionBasePrice,
        auctionMinimumPrice,
        auctionMaximumPrice,
        maxBidsCount,
        privateData,
      );
      this.contractAddress = contract;
      return contract;
    } catch (error) {
      throw new Error(errorStrings.ERROR_DEPLOY_CONTRACT);
    }
  };

  getContract = () => {
    const MyContract = Web3Service.getContract(this.contractAddress);
    return MyContract;
  };
}

export default new ContractController();
