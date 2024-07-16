import { app } from "./app";
import config from "./config/config";
import connection from "./utils/mongoose";

connection();
const server = app.listen(config.server.port, () => {
  console.log(`this app is listening on port ${config.server.port}....`);
});