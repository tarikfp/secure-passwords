const express = require("express");
const router = express.Router();
const Identity = require("../models/Identity");
const ExpressBrute = require("express-brute");
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);
const auth = require("../middleware/auth");
const { generateSalt } = require("../custom-services/Salter");
const { hash } = require("../custom-services/Hash");

router.post("/", [auth, bruteforce.prevent], async (req, res) => {
  try {
    const { password, title } = req.body;
    const salt = generateSalt(10);
    const hashedPassword = await hash(password, salt);
    const identity = new Identity({
      title,
      password: hashedPassword.password,
      salt: hashedPassword.salt,
    });
    await identity.save();
    return res.status(200).json(identity);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/", [auth, bruteforce.prevent], async (req, res) => {
  try {
    const { id, password, title } = req.body;
    let foundIdentity = Identity.findOne({ id });
    if (!foundIdentity) {
      return res.status(404).json({ errors: [{ msg: "No Identity Found !" }] });
    }
    const salt = generateSalt(10);
    const hashedPassword = await hash(password, salt);
    const updatedIdentity = await Identity.findOneAndUpdate(
      { id },
      { salt, password: hashedPassword, title },
      { new: true }
    );
    res.status(200).json({ updatedIdentity });
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send();
  }
});

router.delete("/", [auth, bruteforce.prevent], async (req, res) => {
  try {
    const id = req.params.id;
    let foundIdentity = await Identity.findOne({ id });
    if (!foundIdentity) {
      return res.status(404).json({ errors: [{ msg: "No Identity Found !" }] });
    }
    await Identity.findOneAndDelete({ id });
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send();
  }
});

router.get("/identity", [auth, bruteforce.prevent], async (req, res) => {
  try {
    const identities = await Identity.find();
    return res.status(200).json({ identities });
  } catch (err) {
    return res.status(500).send();
  }
});

router.get("/identity/", [auth, bruteforce.prevent], async (req, res) => {
  try {
    const id = req.params.id;
    let foundIdentity = await Identity.findOne({ id });
    if (!foundIdentity) {
      return res.status(404).json({ errors: [{ msg: "No Identity Found !" }] });
    }
    return res.status(200).json({ foundIdentity });
  } catch (err) {
    return res.status(500).send();
  }
});

module.exports = router;
