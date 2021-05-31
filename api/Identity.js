const express = require("express");
const Identity = require("../models/Identity");
const ExpressBrute = require("express-brute");
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);
const auth = require("../middleware/auth");
const { encrypt } = require("../custom-services/Encryption");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { password, title } = req.body;
    console.log(password);
    const { password: hashedPw, idx } = encrypt(password);
    const identity = new Identity({ title, password: hashedPw, idx: "2" });
    await identity.save();
    return res.status(200).send();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/", [auth, bruteforce.prevent], async (req, res) => {
  try {
    const { id, password, title } = req.body;
    const { password: hashedPw, idx } = encrypt(password);
    let foundIdentity = Identity.findOne({ id });
    if (!foundIdentity) {
      return res.status(404).json({ errors: [{ msg: "No Identity Found !" }] });
    }
    const updatedIdentity = await Identity.findOneAndUpdate(
      { id },
      { idx, password: hashedPw, title },
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
