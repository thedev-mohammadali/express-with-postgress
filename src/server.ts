import app from "./app";
import { initDB } from "./db";

const PORT = 3000;

const main = () => {
  initDB();
  app.listen(PORT, () => {
    console.log(`Server running on the port: ${PORT}`);
  });
};

main();
