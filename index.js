const express = require("express");
const cookieSession = require("cookie-session");
const { graphqlHTTP } = require("express-graphql");
const dotenv = require("dotenv");

dotenv.config();

const schema = require("./graphQlSchema/Schema");
const resolver = require("./graphQlResolver/Resolver");

//middleware for checking who has an authorization with jwt
const isAuthenticated = require("./MiddleWare/AuthMiddleware");

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./Modal/db");

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://pickandsmile.netlify.app/"
  );
  res.setHeader(
    "Access-Control-Allow-Method",
    "OPTIONS, GET, PATCH, POST, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, "
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

//routes
app.use(isAuthenticated);

app.set("trust proxy", 1);
app.use(
  cookieSession({
    name: "sessionPick&smile",
    keys: ["key1", "key2"],
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      ...resolver,
    },
    graphiql: true,
  })
);

app.listen(PORT, () => console.log("application running"));
