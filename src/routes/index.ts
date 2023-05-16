import express from "express";
import climate from "./climateRouter";

const routes = (app: express.Application) => {
  app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).json({
      message: "GetGET API",
    });
  });

  app.use(
    "/climate", climate
  );

};

export default routes;