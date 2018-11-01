const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegInput(data) {
  let errors = {};

  //Kollar om användarnamn är tomt, om den inte är det använd namnet annars sätt det som tom sträng för validering i Validator (tar bara strängar)
  //Egen funktion kollar allt
  data.name = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

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

  if (Validator.isEmpty(data.password)) {
    errors.password = "Du måste skriva ett lösenord";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Lösenord måste vara minst 6 tecken långt";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Verifiera lösenord kan inte vara tom";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Lösenord måste matcha";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

//https://github.com/validator/validator
