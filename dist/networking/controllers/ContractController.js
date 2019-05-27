"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _solc = _interopRequireDefault(require("solc"));

var bytecodeFile = _interopRequireWildcard(require("../contracts/bytecode.json"));

var abiFile = _interopRequireWildcard(require("../contracts/abi.json"));

var _Web3Service = _interopRequireDefault(require("../../services/Web3Service"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ContractController = function ContractController() {
  _classCallCheck(this, ContractController);

  _defineProperty(this, "CompileContract", function () {
    var contractPath = _path["default"].resolve('src', 'contracts', 'cooperative.sol');

    var compilerInput = {
      language: 'Solidity',
      sources: {
        Cooperative: {
          content: _fs["default"].readFileSync(contractPath, 'utf8')
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode']
          }
        }
      }
    };
    var compiledContract = JSON.parse(_solc["default"].compile(JSON.stringify(compilerInput)));

    if (compiledContract.errors) {
      // eslint-disable-next-line no-console
      compiledContract.errors.forEach(function (err) {
        return console.log(err.formattedMessage);
      });
    }

    WriteContractsAbiFile(compiledContract);
    WriteContractsBytecodeFile(compiledContract);
  });

  _defineProperty(this, "DeployContract",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var accounts, bytecodeObject, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Web3Service["default"].getAccounts();

          case 2:
            accounts = _context.sent;
            // eslint-disable-next-line no-console
            console.log(accounts[0]);
            bytecodeObject = bytecodeFile.bytecode;
            _context.prev = 5;
            _context.next = 8;
            return _Web3Service["default"].getContract(abiFile).deploy({
              data: "0x".concat(bytecodeObject.object)
            }).send({
              gas: '1000000',
              from: accounts[0],
              value: 0
            });

          case 8:
            result = _context.sent;
            // eslint-disable-next-line no-console
            console.log("contract address: ".concat(result.options.address));
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](5);
            // eslint-disable-next-line no-console
            console.warn(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 12]]);
  })));
};

var _default = new ContractController();

exports["default"] = _default;