"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _truffleHdwalletProvider = _interopRequireDefault(require("truffle-hdwallet-provider"));

var _web = _interopRequireDefault(require("web3"));

var _ganacheCli = _interopRequireDefault(require("ganache-cli"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Web3Service = function Web3Service() {
  var _this = this;

  _classCallCheck(this, Web3Service);

  _defineProperty(this, "getAccounts",
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _this.web3.eth.getAccounts());

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

  _defineProperty(this, "getContract",
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(abiFile) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", _this.web3.eth.Contract(abiFile));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());

  _dotenv["default"].config(); // TODO: This is for rinkeby add address to .env file etc.
  // this.wallerProvider = new HDWalletProvider(
  //   '{{MNEMONIC}}',
  //   'https://rinkeby.infura.io/v3/29a56dc454464b7c9f5045f8682913f1',
  // );
  // const web3 = new Web3(wallerProvider);
  // This is for ganache.


  this.web3Provider = new _web["default"](new _web["default"].providers.HttpProvider('HTTP://127.0.0.1:8545'));
};

var _default = new Web3Service();

exports["default"] = _default;