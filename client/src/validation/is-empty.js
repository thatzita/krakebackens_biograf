const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export default isEmpty;

//funktion som kollar om värdet är tomt
//används för validering istället för Validator som bara kollar string
