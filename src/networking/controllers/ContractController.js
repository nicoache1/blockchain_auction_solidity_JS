import path from 'path';
import fs from 'fs';
import solc from 'solc';
import * as bytecodeFile from '../contracts/bytecode.json';
import * as abiFile from '../contracts/abi.json';
import Web3Service from '../../services/Web3Service';

class ContractController {
  CompileContract = () => {
    const contractPath = path.resolve('src', 'contracts', 'cooperative.sol');

    const compilerInput = {
      language: 'Solidity',
      sources: {
        Cooperative: { content: fs.readFileSync(contractPath, 'utf8') },
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
    const accounts = await Web3Service.getAccounts();
    // eslint-disable-next-line no-console
    console.log(accounts[0]);
    const bytecodeObject = bytecodeFile.bytecode;

    try {
      const result = await Web3Service.getContract(abiFile)
        .deploy({ data: `0x${bytecodeObject.object}` })
        .send({ gas: '1000000', from: accounts[0], value: 0 });
      // eslint-disable-next-line no-console
      console.log(`contract address: ${result.options.address}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  };
}

export default new ContractController();
