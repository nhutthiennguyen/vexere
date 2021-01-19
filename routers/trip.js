const express = require("express");
const Car = require("../models/car");
const Station = require("../models/station");
const Trip = require("../models/trip");
const { auth } = require("../helpers/auth");
const { Seat, SeatSchema } = require("../models/seat");

const router = express.Router();

router.post("/trip", auth(["admin"]), async (req, res) => {
  let {
    departurePlace,
    arrivalPlace,
    startedDate,
    departureTime,
    carId,
    price,
  } = req.body;
  startedDate = startedDate + " 00:00:00";
  try {
    //check station
    const foundedStation = await Station.find().or([
      { _id: departurePlace },
      { _id: arrivalPlace },
    ]);
    if (foundedStation.length !== 2)
      return res.status(400).send({ message: "invalid station" });
    const foundedCar = await Car.findById(carId);
    if (!foundedCar) return res.status(400).send({ message: "invalid Car" });
    const seatsArr = [...new Array(foundedCar.seats)].map((item, index) => {
      return new Seat({
        name: index,
        status: "avaiable",
      });
    });
    newTrip = new Trip({
      departurePlace,
      arrivalPlace,
      startedDate,
      departureTime,
      seats: seatsArr,
      car: carId,
      price,
    });
    const result = await newTrip.save();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
});
router.get("/trip", auth(), async (req, res) => {
  let { departure, arrival, date } = req.query;
  date = date + " 00:00:00";
  console.log(date);
  try {
    const foundedTrips = await Trip.find({
      departurePlace: departure,
      arrivalPlace: arrival,
      startedDate: date,
    }).populate("departurePlace arrivalPlace car", "name address licensePlace");
    res.send(foundedTrips);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong" });
  }
});

module.exports = router;
