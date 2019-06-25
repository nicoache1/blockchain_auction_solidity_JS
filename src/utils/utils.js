import path from 'path';
import fs from 'fs';

export const WriteContractsAbiFile = compiledContract => {
  const contract = compiledContract.contracts.Auction.Auction;
  const { abi } = contract;
  const abiPath = path.resolve('src', 'contracts', 'abi.json');
  fs.writeFileSync(abiPath, JSON.stringify(abi, null, 2));
};

export const WriteContractsBytecodeFile = compiledContract => {
  const contract = compiledContract.contracts.Auction.Auction;
  const bytecode = contract.evm;
  const byteCodePath = path.resolve('src', 'contracts', 'bytecode.json');
  fs.writeFileSync(byteCodePath, JSON.stringify(bytecode, null, 2));
};

export const getErrorMessage = error =>
  error.response ? error.response.data : error.message;
