const Cars = require("../models/carsModel");

exports.getCars = async (req, res) => {
  await Cars.find({})
    .then((data) => {
      console.log(data);
     return res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json(err);
    });
};

exports.getCar = async (req, res) => {
  await Cars.find({ _id: req.params.id })
    .then((data) => {
      console.log(data);
      return res.status(200).json(data[0]);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ err: "no cars found" });
    });
};
