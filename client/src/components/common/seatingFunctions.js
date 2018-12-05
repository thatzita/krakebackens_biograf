function seatNameConverter(seat) {
  let row;
  let seating;

  if (seat.substring(0, 2) === "r1") {
    row = "Rad 1";
  } else if (seat.substring(0, 2) === "r2") {
    row = "Rad 2";
  } else if (seat.substring(0, 2) === "r3") {
    row = "Rad 3";
  }

  if (seat.substring(2, 4) === "s1") {
    seating = "Parkett 1";
  } else if (seat.substring(2, 4) === "s2") {
    seating = "Parkett 2";
  } else if (seat.substring(2, 4) === "s3") {
    seating = "Parkett 3";
  } else if (seat.substring(2, 4) === "s4") {
    seating = "Parkett 4";
  } else if (seat.substring(2, 4) === "s5") {
    seating = "Parkett 5";
  } else if (seat.substring(2, 4) === "s6") {
    seating = "Parkett 6";
  } else if (seat.substring(2, 4) === "s7") {
    seating = "Parkett 7";
  }

  if (row === undefined && seating === undefined) {
    row = "Ingen VIP-plats vald";
    seating = "";
  }
  let newSeat = `${row} ${seating}`;
  return newSeat;
}

module.exports = { seatNameConverter };
