import express from "express";
import { coletaDados } from "../scraping/coletaDados";
import fs from "fs";

const routes = (app: express.Application) => {
  app.get("/", async (req: express.Request, res: express.Response) => {
    await coletaDados();

    const noticias = fs.readFileSync("noticias.json", "utf-8");
    const noticiasObj = JSON.parse(noticias);

    res.json(noticiasObj);
  });

  // app.use(

  // );

};

export default routes;