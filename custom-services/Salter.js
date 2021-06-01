const crypto = require("crypto");

const generateSalt = (rounds) => {
  if (rounds >= 15) {
    throw new Error(`${rounds} is greater than 15,Must be less that 15`);
  }
  if (typeof rounds !== "number") {
    throw new Error("rounds param must be a number");
  }
  if (rounds == null) {
    rounds = 12;
  }
  return crypto
    .randomBytes(Math.ceil(rounds / 2))
    .toString("hex")
    .slice(0, rounds);
};

module.exports = { generateSalt };
