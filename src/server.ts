import app from "./app";
import config from "./config";
import { initDB } from "./db";

const PORT = config.port;

const main = () => {
  initDB();
  app.listen(PORT, () => {
    console.log(`Server running on the port: ${PORT}`);
  });
};

main();
