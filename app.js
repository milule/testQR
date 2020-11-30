const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//
const path = require("path");
const utilities = require("./server/utility/Utilities");
// integrate swagger
const fs = require("fs");
const swaggerTools = require("swagger-tools");
const jsyaml = require("js-yaml");
const schedule = require("node-schedule");
const Keys = require("./server/common/keys.js");
const apiKey = new Keys();

try {
  process.token_org =
    "J1f8lQDY0kgheoSWmX2yRGW8Kz80wT2qKcJWokORvM0lozdNMbpRi4rrFp1Uy02WfdKwvQZp9nZxqNb5SaVv7iS1JYwU0txnWRUCJM";
  process.token =
    "Bearer J1f8lQDY0kgheoSWmX2yRGW8Kz80wT2qKcJWokORvM0lozdNMbpRi4rrFp1Uy02WfdKwvQZp9nZxqNb5SaVv7iS1JYwU0txnWRUCJM";
  // const rule = new schedule.RecurrenceRule();
  // rule.minute = new schedule.Range(0, 59, 60);
  // schedule.scheduleJob(rule, function() {
  //     try {
  //       console.log('change token');
  //       const token = apiKey.getUuid();
  //       process.token_org = token;
  //       process.token = 'Bearer ' + process.token_org;
  //     } catch (ex) {
  //         logger.error(ex);
  //     }
  // });
} catch (ex) {
  // do nothing
}

try {
  const SqliteDb = require("./server/common/SqliteDb.js");
  const sqliteDb = new SqliteDb();
  sqliteDb.createTable();
  // sqliteDb.deleteData();
  sqliteDb.close();
} catch (ex) {}

// const dotenv = require('dotenv');
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Require our routes into the application.
// require('./server/routes')(app);

// swaggerRouter configuration
const options = {
  // swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, "server/controllers"),
  useStubs: process.env.NODE_ENV === "development", // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const spec = fs.readFileSync(
  path.join(__dirname, "server/swagger/swagger.yaml"),
  "utf8"
);
const swaggerDoc = jsyaml.safeLoad(spec);

// logger.info('===============================================================');
// logger.info('The [app.js] is started running');
// logger.info('===============================================================');
//===============================================================
//START METHOD SUPPORT RESFULL API
//===============================================================
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.post("/getTermsText", function (req, res, next) {
  res.status(200).send({
    errorCode: "Request/ErrorDocomoBikeShareGetTerms",
  });
});

app.post("/", function (req, res, next) {
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  });
});
app.put("/", function (req, res, next) {
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  });
});
app.delete("/", function (req, res, next) {
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  });
});
app.use("/public", express.static("public"));

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  app.use(express.static("./node_modules/swagger-tools/middleware/swagger-ui"));
  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());
});

//===============================================================
//END METHOD SUPPORT RESFULL API
//===============================================================

//===============================================================
// START OBJECT REGISTER FIREBASE
//===============================================================
try {
  const admin = require("firebase-admin");
  const serviceAccount = require("./serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://neocenter3d.firebaseio.com",
  });
  // test
  const ruleFirebase = new schedule.RecurrenceRule();
  ruleFirebase.minute = new schedule.Range(0, 59, 60);
  const FirebaseNotification = require("./server/common/FirebaseNotification.js");
  const firebase = new FirebaseNotification();
  firebase.sendNotification();
  schedule.scheduleJob(ruleFirebase, function () {
    try {
      firebase.sendNotification();
    } catch (ex) {
      logger.error(ex);
    }
  });
} catch (ex) {
  console.log("initializeApp#error::" + ex);
}

module.exports = app;
