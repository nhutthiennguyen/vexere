const express = require("express");
const Car = require("../models/car");
const router = express.Router();
router.post("/car", async (req, res) => {
  try {
    const { branchId, licensePlace, seats } = req.body;
    const foundCar = await Car.findOne({ licensePlace });
    if (foundCar)
      return res
        .status(400)
        .send({ message: "License place had already existed" });
    const newCar = new Car({
      branch: branchId,
      licensePlace,
      seats,
    });
    const result = await newCar.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
});

module.exports = router;
