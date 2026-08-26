const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter firstname"],
      trim: true,
      maxLength: [100, "Firstname cannot be more than 100 characters"],
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      maxLength: [100, "Firstname cannot be more than 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: () => `Please enter a valid email address.`,
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = model("User", userSchema);
module.exports = User;
