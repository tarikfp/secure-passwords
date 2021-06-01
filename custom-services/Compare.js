const { hasher } = require("./Hasher");

const compare = (password, hash) => {
  if (password == null || hash == null) {
    throw new Error("password and hash is required to compare");
  }
  if (typeof password !== "string" || typeof hash !== "object") {
    throw new Error("password must be a String and hash must be an Object");
  }
  let passwordData = hasher(password, hash.salt);
  if (passwordData.password === hash.hashedpassword) {
    return true;
  }
  return false;
};

module.exports = { compare };
