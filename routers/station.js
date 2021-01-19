const express = require("express");
const Station = require("../models/station");
const router = express.Router();

router.post("/station", async (req, res) => {
  try {
    const { name, address, province, code } = req.body;
    const foundedStation = await Station.findOne({ code });
    if (foundedStation)
      return res.status(400).send({ message: "Station had already" });
    const newStation = new Station({
      name,
      address,
      province,
      code,
    });
    const result = await newStation.save();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
});
router.delete("/station", async (req, res) => {
  const { id } = req.query;
  try {
    const result = await Station.findByIdAndDelete();
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: "something went wrong" });
  }
});

module.exports = router;
