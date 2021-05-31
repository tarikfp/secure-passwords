const crypto = require("crypto");

const hasher = (password, salt) => {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt: salt,
    password: value,
  };
};

module.exports = { hasher };
