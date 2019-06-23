import ContractController from '../networking/controllers/ContractController';

const appRouter = app => {
  app.get('/Contract/Compile', async (req, res) => {
    try {
      await ContractController.CompileContract();
      res.status(200).send('Compiled');
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.get('/Contract/Deploy', async (req, res) => {
    try {
      const contract = await ContractController.DeployContract();
      res.status(200).send(contract);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.get('/Auction/Name', async (req, res) => {
    try {
      const name = await ContractController.GetName();
      res.status(200).send(name);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });

  app.get('/Auction/Description', async (req, res) => {
    try {
      const description = await ContractController.GetDescription();
      res.status(200).send(description);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });
};

export default appRouter;
