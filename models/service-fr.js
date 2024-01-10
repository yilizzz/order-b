const mongoose = require("mongoose");
const servicesSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: false },
  link: { type: String, required: false },
  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  image: { type: String, required: false },
});
//In Mongoose, when you create a model using mongoose.model(),
//Mongoose automatically pluralizes the model name and uses it as the name of the MongoDB collection.
//That's why you see service-frs instead of service-fr in the database.
//If you want to use service-fr as the name of the collection,
//you can pass an additional parameter to mongoose.model() to specify the name of the collection.
//mongoose.model("service-fr", servicesSchema, "service-fr");
module.exports = mongoose.model("service-frs", servicesSchema);
