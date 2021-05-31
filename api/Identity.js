const express = require("express");
const Identity = require("../models/Identity");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { password, title } = req.body;
    const { password: hashedPw, idx } = encrypt(password);
    const identity = new Identity({ title, password: hashedPw, idx });
    await identity.save();
    return res.status(200).send();
  } catch (err) {
    return res.status(500).send();
  }
});

router.put("/", auth, async (req, res) => {
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

router.delete("/", auth, async (req, res) => {
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

router.get("/getall", auth, async (req, res) => {
  try {
    const identities = await Identity.find();
    return res.status(200).json({ identities });
  } catch (err) {
    return res.status(500).send();
  }
});

router.post("/getbyid", auth, async (req, res) => {
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
