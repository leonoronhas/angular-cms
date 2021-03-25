const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Document", schema);
