require("dotenv").config();
require("colors");
const database = require("./utils/DB");
const server = require("./app");

database();

const port = process.env.PORT;

server.listen(port, () => {

  console.log(`Server Lisnting at port ${port}`.blue);
});

