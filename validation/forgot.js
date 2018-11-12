const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //Kollar om login uppgifterna stämmer

  data.email = !isEmpty(data.email) ? data.email : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Felaktig e-post";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Du måste skriva in en e-post";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

//https://github.com/validator/validator
