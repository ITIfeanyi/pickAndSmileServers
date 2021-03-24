const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        "Please your name is required to complete this registration",
      ],
      minlength: [3, "Enter a name with a minimum length of 3"],
    },
    email: {
      type: String,
      unique: true,
      required: [
        true,
        "Please an email is required to complete this registration",
      ],
      validator: [isEmail, "Please check again and input a correct email"],
    },
    phoneNum: {
      type: String,
      unique: true,
      required: [
        true,
        "Please fill in a phone number to complete this registration",
      ],
      minlength: [11, "phone number should be eleven in number"],
    },
    password: {
      type: String,
      minlength: [6, "password should be at least 6 characters long"],
      required: [
        true,
        "Please fill in your password to complete this registration",
      ],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
