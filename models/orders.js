const mongoose = require("mongoose");
const ordersSchema = mongoose.Schema(
  {
    client_email: { type: String, required: true },
    orderList: [
      {
        service_name: { type: String, required: true },
        count: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("orders", ordersSchema);
