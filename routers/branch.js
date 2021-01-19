const express = require("express");
const Branch = require("../models/branch");
const router = express.Router();
router.post("/branch", async (req, res) => {
  try {
    const foundedBranch = await Branch.findOne({ code: req.body.code });

    if (foundedBranch) {
      res.status(400).send({ massage: "Branch has already existed" });
      return;
    }

    const newBranch = new Branch({
      name: req.body.name,
      code: req.body.code,
      hotline: req.body.hotline,
      address: req.body.address,
      status: "inactive",
    });

    const result = await newBranch.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ error: err });
  }
});

module.exports = router;
