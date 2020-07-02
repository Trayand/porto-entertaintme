const express = require("express");
const app = express();
const cors = require("cors")();
const mongoose = require("mongoose");
const routes = require("./routes");
const morgan = require("morgan")("dev");
const errorHandler = require("./middlewares/errorHandler");
const port = 4001;
const MongoUri =
  "mongodb+srv://ayam:goreng@cluster0-pdvx8.mongodb.net/test?retryWrites=true&w=majority";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);
app.use(morgan);

mongoose
  .connect(MongoUri, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect"))
  .catch(() => console.log("cant connect"));

app.use(routes);

app.use(errorHandler);

app.listen(port, () => console.log("listening on port " + port));
