const app = require("./app");
// const SQLdb = require("./models/sql");
// const SqlRouter = require("./routers/sql/router");
const MongoRouter = require("./routers/mongo/router");
// const MongoWithKafkaRouter = require("./middlewareAPIs/router");

app.get("/", (req, res) => {
  res
    .status(200)
    .send("Splitwise Backend API is Alive!, access the routes to get data!");
});

// app.use("/router", SqlRouter);
// SQLdb.sequelize.sync().then(() => {
//   app.listen(3001, console.log("server started on port 3001"));
// });

app.use("/router", MongoRouter);
app.listen(3001, console.log("MongoDB server started on port 3001"));
// app.use("/router", MongoWithKafkaRouter);
// app.listen(3001, console.log("middleware server started on port 3001"));

module.exports = app;
