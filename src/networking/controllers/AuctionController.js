import { errorStrings } from './errorStrings';
import ContractController from './ContractController';

class AuctionController {
  // TODO: Ask about the gas and if we should use send and send the gas
  // from the account that is being called, etc.

  getName = async address => {
    const MyContract = ContractController.getContract();
    try {
      const name = await MyContract.methods.getAuctionName().call({
        from: address,
      });
      return name;
    } catch (error) {
      throw new Error(errorStrings.ERROR_GET_NAME);
    }
  };

  getDescription = async address => {
    const MyContract = ContractController.getContract();
    try {
      const description = await MyContract.methods
        .getAuctionDescription()
        .call({
          from: address,
        });
      return description;
    } catch (error) {
      throw new Error(errorStrings.ERROR_GET_DESCRIPTION);
    }
  };

  getActualBid = async address => {
    const MyContract = ContractController.getContract();
    try {
      const actualBid = await MyContract.methods.getActualBid().call({
        from: address,
      });
      return actualBid;
    } catch (error) {
      throw new Error(errorStrings.ERROR_ACTUAL_BID);
    }
  };

  getAuctionBasePrice = async address => {
    const MyContract = ContractController.getContract();
    try {
      const basePrice = await MyContract.methods.getAuctionBasePrice().call({
        from: address,
      });
      return basePrice;
    } catch (error) {
      throw new Error(errorStrings.ERROR_GET_BASE_PRICE);
    }
  };

  getAuctionMinimumPrice = async address => {
    const MyContract = ContractController.getContract();
    try {
      const minimumPrice = await MyContract.methods
        .getAuctionMinimumPrice()
        .call({
          from: address,
        });
      return minimumPrice;
    } catch (error) {
      throw new Error(errorStrings.ERROR_GET_MINIMUM_PRICE);
    }
  };

  getAuctionMaximumPrice = async address => {
    const MyContract = ContractController.getContract();
    try {
      const maximumPrice = await MyContract.methods
        .getAuctionMaximumPrice()
        .call({
          from: address,
        });
      return maximumPrice;
    } catch (error) {
      throw new Error(errorStrings.ERROR_GET_MAXIMUM_PRICE);
    }
  };

  getAuctionBidsCount = async address => {
    const MyContract = ContractController.getContract();
    try {
      const bidsCount = await MyContract.methods.getAuctionBidsCount().call({
        from: address,
      });
      return bidsCount;
    } catch (error) {
      throw new Error(errorStrings.ERROR_GET_BIDS_COUNT);
    }
  };

  getBids = async address => {
    const MyContract = ContractController.getContract();
    try {
      const bids = await MyContract.methods.getBids().call({
        from: address,
      });
      return bids;
    } catch (error) {
      throw new Error(errorStrings.ERROR_GET_BIDS);
    }
  };

  closeAuction = async address => {
    const MyContract = ContractController.getContract();
    try {
      const response = await MyContract.methods.closeAuction().call({
        from: address,
      });
      return response;
    } catch (error) {
      throw new Error(errorStrings.ERROR_CLOSE_BID);
    }
  };

  addBid = async (address, value, gas) => {
    const MyContract = ContractController.getContract();
    try {
      const response = await MyContract.methods.addBid().send({
        from: address,
        value,
        gas,
      });
      return response;
    } catch (error) {
      throw new Error(errorStrings.ERROR_ADD_BID);
    }
  };

  getMoneyBalance = async address => {
    const MyContract = ContractController.getContract();
    try {
      const response = await MyContract.methods.getMoneyBalance().send({
        from: address,
      });
      return response;
    } catch (error) {
      throw new Error(errorStrings.ERROR_GET_BALANCE);
    }
  };
}

export default new AuctionController();
