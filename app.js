const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const tripRouter = require("./routers/trip");
const branchRouter = require("./routers/branch");
const carRouter = require("./routers/car");
const stationRouter = require("./routers/station");
const userRouter = require("./routers/user");
const meRouter = require("./routers/me");

const app = express();

/**
 * 1. CRUD Brach
 * 2. CRUD car
 * 3. CRUD trip
 * 4. CRUD Station
 * 5. booking ticket
 * 6. Authentication, Authorization
 * 7. Upload file
 * 8. Chat module
 */

app.use(bodyParser.json());

app.use(tripRouter);

app.use(branchRouter);

app.use(carRouter);

app.use(stationRouter);

app.use(userRouter);

app.use(meRouter);

mongoose
  .connect(
    "mongodb+srv://nguyennhutthien:Thien@69@cluster0.ob1uv.mongodb.net/vexereDb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log("listening");
});
