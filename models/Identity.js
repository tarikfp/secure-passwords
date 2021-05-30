const express = require("express");
const Identity = require("../api/Identity");
const router = express.Router();

router.post("/addidentity", (req, res) => {
  try {
    const { password, title } = req.body;
    const { password: hashedPw, idx } = encrypt(password);
    const identity = new Identity({ title, password: hashedPw, idx });
    await identity.save();
    return res.json({ msg: "success" });
  } catch (err) {
    return res.status(500).send();
  }
});

//@TODO get identity from mongo db
router.get("/getidentity", (req, res) => {});
