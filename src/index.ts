import { app, port, host } from "./config";
import { logger } from "./logger";
import routes from "./routes";

routes(app);

app.listen(port, host, () => {
  logger.info(`Server running at http://${host}:${port}`);
});
