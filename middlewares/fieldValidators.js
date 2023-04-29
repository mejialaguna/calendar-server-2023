const { response } = require("express");
const { validationResult } = require("express-validator");

const fieldValidators = (req, res = response, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(400).json({ ok: false, message: error.mapped() });
    console.log(error);
    return;
  }
  next();
};

module.exports = { fieldValidators };
