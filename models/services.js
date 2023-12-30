const mongoose = require("mongoose");
const servicesSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: false },
  link: { type: String, required: false },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  image: { type: String, required: false },
});
module.exports = mongoose.model("services", servicesSchema);
