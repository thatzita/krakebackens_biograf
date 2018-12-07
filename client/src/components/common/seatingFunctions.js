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
    seating = "Stol 1";
  } else if (seat.substring(2, 4) === "s2") {
    seating = "Stol 2";
  } else if (seat.substring(2, 4) === "s3") {
    seating = "Stol 3";
  } else if (seat.substring(2, 4) === "s4") {
    seating = "Stol 4";
  } else if (seat.substring(2, 4) === "s5") {
    seating = "Stol 5";
  } else if (seat.substring(2, 4) === "s6") {
    seating = "Stol 6";
  }

  if (row === undefined && seating === undefined) {
    row = "Ingen VIP-plats vald";
    seating = "";
  }
  let newSeat = `${row} ${seating}`;
  return newSeat;
}

module.exports = { seatNameConverter };
