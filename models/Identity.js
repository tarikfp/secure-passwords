const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IdentitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  idx: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = Identity = mongoose.model("identity", IdentitySchema);
