"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WriteContractsBytecodeFile = exports.WriteContractsAbiFile = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WriteContractsAbiFile = function WriteContractsAbiFile(compiledContract) {
  var contract = compiledContract.contracts.Cooperative.Cooperative;
  var abi = contract.abi;

  var abiPath = _path["default"].resolve('src', 'contracts', 'abi.json');

  _fs["default"].writeFileSync(abiPath, JSON.stringify(abi, null, 2));
};

exports.WriteContractsAbiFile = WriteContractsAbiFile;

var WriteContractsBytecodeFile = function WriteContractsBytecodeFile(compiledContract) {
  var contract = compiledContract.contracts.Cooperative.Cooperative;
  var bytecode = contract.evm;

  var byteCodePath = _path["default"].resolve('src', 'contracts', 'bytecode.json');

  _fs["default"].writeFileSync(byteCodePath, JSON.stringify(bytecode, null, 2));
};

exports.WriteContractsBytecodeFile = WriteContractsBytecodeFile;