import ContractController from '../networking/controllers/ContractController';
import AuctionController from '../networking/controllers/AuctionController';
import { getErrorMessage } from '../utils/utils';

const appRouter = app => {
  app.get('/Contract/Compile', async (_req, res) => {
    try {
      await ContractController.compileContract();
      res.status(200).send('Compiled');
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.post('/Contract/Deploy', async (req, res) => {
    try {
      const {
        account,
        item,
        auctionName,
        auctionDescription,
        auctionBasePrice,
        auctionMinimumPrice,
        auctionMaximumPrice,
        maxBidsCount,
        privateData,
      } = req.body;
      const contract = await ContractController.deployContract(
        account,
        item,
        auctionName,
        auctionDescription,
        auctionBasePrice,
        auctionMinimumPrice,
        auctionMaximumPrice,
        maxBidsCount,
        privateData,
      );
      res.status(200).send(`The contract address is ${contract}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.get('/Auction/Name', async (req, res) => {
    try {
      const { fromAddress } = req.query;
      const name = await AuctionController.getName(fromAddress);
      res.status(200).send(`The name of the auction is ${name}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.get('/Auction/Description', async (req, res) => {
    try {
      const { fromAddress } = req.query;
      const description = await AuctionController.getDescription(fromAddress);
      res.status(200).send(`The description of the auction is ${description}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.get('/Auction/ActualBid', async (req, res) => {
    try {
      const { fromAddress } = req.query;
      const actualBid = await AuctionController.getActualBid(fromAddress);
      res.status(200).send(`The max bid of the auction is ${actualBid}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.get('/Auction/BasePrice', async (req, res) => {
    try {
      const { fromAddress } = req.query;
      const basePrice = await AuctionController.getAuctionBasePrice(
        fromAddress,
      );
      res.status(200).send(`The base price of the auction is ${basePrice}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.get('/Auction/MaximumPrice', async (req, res) => {
    try {
      const { fromAddress } = req.query;
      const maximumPrice = await AuctionController.getAuctionMaximumPrice(
        fromAddress,
      );
      res
        .status(200)
        .send(`The maximum price of the auction is ${maximumPrice}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.get('/Auction/MinimumPrice', async (req, res) => {
    try {
      const { fromAddress } = req.query;
      const minimumPrice = await AuctionController.getAuctionMinimumPrice(
        fromAddress,
      );
      res
        .status(200)
        .send(`The minimum price of the auction is ${minimumPrice}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.get('/Auction/BidsCount', async (req, res) => {
    try {
      const { fromAddress } = req.query;
      const bidsCount = await AuctionController.getAuctionBidsCount(
        fromAddress,
      );
      res.status(200).send(`The bids count of the auction is ${bidsCount}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.get('/Auction/Bids', async (req, res) => {
    try {
      const { fromAddress } = req.query;
      const bids = await AuctionController.getBids(fromAddress);
      res.status(200).send(`The bids of the auction are ${JSON.stringify(bids)}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.get('/Auction/Balance', async (req, res) => {
    try {
      const { fromAddress } = req.query;
      const balance = await AuctionController.getMoneyBalance(fromAddress);
      res.status(200).send(`The balance of the auction is ${balance}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.put('/Auction', async (req, res) => {
    try {
      const { fromAddress } = req.body;
      const closedResponse = await AuctionController.closeAuction(fromAddress);
      res.status(200).send(`The auction from ${fromAddress} is closed`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });

  app.post('/Auction/Bids', async (req, res) => {
    try {
      const { fromAddress, value, gas } = req.body;
      const addBidResponse = await AuctionController.addBid(
        fromAddress,
        value,
        gas,
      );
      res.status(200).send(`New bid addded to the auction from ${fromAddress} with value ${value}`);
    } catch (error) {
      res.status(500).send(getErrorMessage(error));
    }
  });
};

export default appRouter;
