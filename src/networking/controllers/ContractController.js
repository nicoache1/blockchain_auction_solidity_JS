import path from 'path';
import fs from 'fs';
import solc from 'solc';
import Web3Service from '../../services/Web3Service';
import {
  WriteContractsAbiFile,
  WriteContractsBytecodeFile,
} from '../../utils/utils';

class ContractController {
  CompileContract = () => {
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
      // eslint-disable-next-line no-console
      compiledContract.errors.forEach(err => console.log(err.formattedMessage));
    }

    WriteContractsAbiFile(compiledContract);
    WriteContractsBytecodeFile(compiledContract);
  };

  DeployContract = async () => {
    try {
      const accounts = await Web3Service.getAccounts();
      const contract = await Web3Service.deployContract(accounts[0]);
      // TODO: Ask about this.
      console.log(`contract address: ${contract}`);
      return contract;
    } catch (error) {
      throw new Error(error);
    }
  };

  GetName = async () => {
    const MyContract = Web3Service.getContract(
      '0x131E47EB0504657124D2d7249d2db8C64A08C16B',
    );
    try {
      const name = await MyContract.methods.getAuctionName().call();
      return name;
    } catch (error) {
      throw new Error('Error');
    }
  };

  GetDescription = async () => {
    const MyContract = Web3Service.getContract(
      '0x131E47EB0504657124D2d7249d2db8C64A08C16B',
    );
    try {
      const description = await MyContract.methods
        .getAuctionDescription()
        .call();
      return description;
    } catch (error) {
      throw new Error('Error');
    }
  };
}

export default new ContractController();
