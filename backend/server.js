require("dotenv").config();
const express = require("express");
//Graphql
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphSchema");
const root = require("./graphRoot");
//mongoose
const mongoose = require("mongoose");
//cors
const cors = require("cors");
//DB connection
mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  });

const app = express();
app.use(cors());
//middleware for graphql interactions
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
//Server
const { PORT } = process.env;
app.listen(PORT);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
