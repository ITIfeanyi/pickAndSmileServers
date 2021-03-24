const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    cart_product: {
      single_product: {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        qty: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
        },
      },

      total_price: Number,
    },
    address: {
      type: String,
    },
    address_city: {
      type: String,
    },
    address_state: {
      type: String,
    },
    address_country: {
      type: String,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
