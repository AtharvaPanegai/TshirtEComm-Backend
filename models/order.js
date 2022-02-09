/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    postalCode: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  paymentInfo: {
    id: {
      type: String,
    },
  },
  taxAmount: {
    type: Number,
    required: true,
  },

  shippingAmount: {
    type: Number,
    required: true,
  },

  totalAmount: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
  },
  deliveredOn: {
    type: Date,
  },
  createdAt: {
    type: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);

/**shippingIInfo{}
user
payment{}
taxAmount
ShippingCharges
Total Amount
OrderStatus
deliveredAt
createdAt
-----------
orderItems:[{}]
-name
-quantity
-images[O]
price
product */
