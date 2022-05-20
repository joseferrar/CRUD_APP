require("dotenv").config();
const express = require("express");
var { graphqlHTTP } = require("express-graphql");
var cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const port = 5000;

const schema = require("./schema/noteschema");

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("mongoose connected successfully");
});
mongoose.connection.on("err", (err) => {
  console.log("mongoose error", err);
});

app.use(express.json())
app.use(express.urlencoded({extended: false}))
//frontend production
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(port, () => {
  console.log("listening on port " + port);
});

//T4
