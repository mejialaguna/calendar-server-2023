const express = require("express"); // !step 1 install express dependencies
const cors = require("cors");
require("dotenv").config(); // ! step 3 install dotenv dependencies

const { dbConnection } = require("./database/config");

const startServer = async () => {
  const app = express(); // !step 1
  const PORT = process.env.PORT || 3000; // ! step 3 also add .env file and add env variables there.

  // !!Add CORS middleware here if need or this middleware will just have default settings.
  app.use(cors());

  // ! public index file path
  app.use(express.static("public")); // ! step 4 use app.use and point to public folder.

  app.use(express.json()); // ! step 5 use app.use to parse json data. (process the content of the body)

  app.use(require("./routes")); // !step 5 use point to the routes folder were the routes are stored.

  // TODO: step 6 add routes

  dbConnection(); // TODO call the db connection.

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // ! all of this app listen step 2
  });
};

startServer();
