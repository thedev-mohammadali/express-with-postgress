import app from "./app";

const PORT = 3000;

const main = () => {
  app.listen(PORT, () => {
    console.log(`Server running on the port: ${PORT}`);
  });
};

main();
