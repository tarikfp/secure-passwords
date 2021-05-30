// nodejs default library crypto
// see source website : https://nodejs.org/api/crypto.html
const crypto = require("crypto");
// import config library in order to get secret from json
const config = require("config");
// secret variable for encryption
const secret = config.get("secret.crypto");

// 16 bytes encryption with aes-256-ctr

const encrypt = (password) => {
  // function which take password param to be encrypted
  const idx = Buffer.from(crypto.randomBytes(16));
  // idx is identifier for encryption
  const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), idx);

  const encryptedPassword = Buffer.concat([
    cipher.update(password),
    cipher.final(),
  ]);

  return {
    idx: idx.toString("hex"),
    password: encryptedPassword.toString("hex"),
  };
  // returning an response object with idx(identifier) and the password as a string hexadeciaml
};

// Using secret and passing encryption idx in order to decrpyt given password
const decrypt = (encryption) => {
  const decipher = crypto.createDecipheriv(
    "aes-256-ctr",
    Buffer.from(secret),
    Buffer.from(encryption.idx, "hex")
  );
  const decryptedPassword = Buffer.concat([
    decipher.update(Buffer.from(encryption.password, "hex")),
    decipher.final(),
  ]);

  // returning decrpyted password as string
  return decryptedPassword.toString();
};
//to access these function in another file
module.exports = { encrypt, decrypt };
