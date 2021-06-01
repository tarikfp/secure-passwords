# Secure Passwords App

## Quick Access

### https://tariksecurepassword.netlify.app/

## Introduction

This is MERN app. MERN stands for MongoDB, Express, React, Node.

In order to use the app, first user needs to register to the system. While registering, user needs to provide name, surname, email and password.

### Registering to the app

In register, user's password will be saved to mongodb. Not as a plain text, but as using aes-256-ctr algorithm and crypto module of nodejs. User's plain password will be encrypted
using ``crypto.createCipheriv`` function. In the code below 16 bytes encryption used with aes-256-ctr.

```

const crypto = require("crypto");
const config = require("config");
const secret = process.env.CRYPTO_SECRET || config.get("secret.crypto");
const algorithm = "aes-256-ctr";
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secret, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    password: encrypted.toString("hex"),
  };
};
```

An example of registered user in mongodb document is showned below. As it can be realized, encryption function return values which are iv (initialization vector) and password are saved in mongoose document as well as user's other fields.

![image](https://user-images.githubusercontent.com/61876765/120395673-0db0a080-c33e-11eb-9501-d4e57c5f6383.png)





