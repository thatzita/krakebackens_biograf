const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMovieInput(data) {
  let errors = {};

  //Kollar om användarnamn är tomt, om den inte är det använd namnet annars sätt det som tom sträng för validering i Validator (tar bara strängar)
  //Egen funktion kollar allt
  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";

  //Kanske ska implementeras
  data.background = !isEmpty(data.background) ? data.background : "";
  data.runtime = !isEmpty(data.runtime) ? data.runtime : "";
  data.genres = !isEmpty(data.genres) ? data.genres : "";
  data.imdb_id = !isEmpty(data.imdb_id) ? data.imdb_id : "";
  data.release = !isEmpty(data.release) ? data.release : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Måste ha en titel på filmen";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Måste ha en beskrivning på filmen";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

//https://github.com/validator/validator
