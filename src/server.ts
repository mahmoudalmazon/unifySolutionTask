import { app } from "./app";
import connection from "./utils/mongoose";

connection();
const server = app.listen(9999, () => {
  console.log(`this app is listening on port 9999....`);
});