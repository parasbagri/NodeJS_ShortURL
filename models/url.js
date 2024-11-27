const mongoose = require("mongoose");
// Destructure Schema from mongoose
const { Schema } = mongoose;

// schema
const urlSchema = new Schema(
  {
    redirectURL: {
      type: String,
      required: true,
      unique: true,
    },
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
    // totalClicks: {
    //   type: Number,
    //   default: 0,
    //   required: true,
    // },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true }
  // timestamps: true will add createdAt and updatedAt fields automatically
);

const URL = mongoose.model("url", urlSchema);

// export the model
module.exports = URL;
