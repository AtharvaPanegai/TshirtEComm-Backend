/** @format */

// product Model
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [120, "Name should be under 120 chars"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    maxlength: [6, "Product Price should not be more than 6 digits"],
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
  },
  //   we'll use photo array for multiple images
  photos: [
    {
      id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [
      true,
      "Please select category from = short-sleeves,long-sleeves,sweat-shirts,hoodies",
    ],
    enum: {
      values: ["shortsleeves", "longsleeves", "sweatshirt", "hoodies"],
      message:
        "Please select category only from = short-sleeves,long-sleeves,sweat-shirts,hoodies",
    },
  },
  brand: {
    type: String,
    required: [true, "Please provide a brandname"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * name
price
description
images[]
category
brand
stock
ratings
numOfReviews
reviews[user,name,rating,comment],
user
createdAt
 */

module.exports = mongoose.model("Product", productSchema);
