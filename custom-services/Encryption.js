// nodejs default library crypto
// see source website : https://nodejs.org/api/crypto.html
const crypto = require("crypto");
// import config library in order to get secret from json
const config = require("config");
// secret variable for encryption
const secret = process.env.CRYPTO_SECRET || config.get("secret.crypto");
const algorithm = "aes-256-ctr";
const iv = crypto.randomBytes(16);

// 16 bytes encryption with aes-256-ctr

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secret, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    password: encrypted.toString("hex"),
  };
};

// Using secret and passing encryption idx in order to decrpyt given password
const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secret,
    Buffer.from(hash.iv, "hex")
  );
  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.password, "hex")),
    decipher.final(),
  ]);
  return decrpyted.toString();
};

const compare = (password, hash) => {
  const plainPassword = decrypt(hash);
  if (password === plainPassword) {
    return true;
  }
  return false;
};

//exporting functions in order to access in another files
module.exports = { encrypt, decrypt, compare };
