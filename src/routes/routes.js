import ContractController from '../networking/controllers/ContractController'

const appRouter = app => {
  app.get('/Test', async (req, res) => {
    try {
      const response = await ContractController.testMethod();
      res.status(200).send(response);
    } catch (error) {
      const errorResponse = error.response
        ? error.response.data
        : error.message;
      res.status(500).send(errorResponse);
    }
  });
};

export default appRouter;
