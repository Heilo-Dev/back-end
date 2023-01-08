require("dotenv").config();
require("colors");
const database = require("./utils/DB");
const app = require("./app");

database();

const port = process.env.PORT;

app.listen(port, () => {
<<<<<<< HEAD
    console.log(`Server Lisnting at port ${port}`.bgWhite.black )
})
=======
  console.log(`Server Lisnting at port ${port}`.blue);
});
>>>>>>> shaon
