const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  //Kollar om login uppgifterna stämmer

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Felaktig e-post";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Du måste skriva ett lösenord";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Lösenord måste vara minst 6 tecken långt";
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
