const { hasher } = require("./Hasher");

const hash = (password, salt) => {
  if (password == null || salt == null) {
    throw new Error("Must Provide Password and salt values");
  }
  if (typeof password !== "string" || typeof salt !== "string") {
    throw new Error(
      "password must be a string and salt must either be a salt string or a number of rounds"
    );
  }
  return hasher(password, salt);
};

module.exports = { hash };
