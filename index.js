require("dotenv").config();
require("colors");
const database = require("./utils/DB");
const app = require("./app")
const server = require("././utils/Socket");
database();

const port = process.env.PORT;
console.log(app);

// server.listen(port, () => {

//   console.log(`Server Lisnting at port ${port}`.blue);
// });
app.listen(port, () => {

  console.log(`Server Lisnting at port ${port}`.blue);
});
