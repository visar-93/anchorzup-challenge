const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlShchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  expire: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("url", UrlShchema);
