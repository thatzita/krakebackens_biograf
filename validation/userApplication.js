const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateApplicationInput(data) {
  let errors = {};

  //Kollar om login uppgifterna stämmer
  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  if (!Validator.isLength(data.username, { min: 3, max: 20 })) {
    errors.username = "Användarnamn måste vara mellan 3 och 20 tecken";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Du måste skriva in användarnamn";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Du måste skriva in en e-post";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Felaktig e-post";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

//https://github.com/validator/validator
