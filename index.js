const express = require("express");
const expressSession = require("express-session");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphQlSchema/Schema");
const resolver = require("./graphQlResolver/Resolver");

//middleware for checking who has an authorization with jwt
const isAuthenticated = require("./MiddleWare/AuthMiddleware");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./Modal/db");

//routes
app.use(isAuthenticated);
app.use(
  expressSession({
    secret: "hello express",
    resave: true,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
