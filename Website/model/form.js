const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    pass: {
      type: String,
      required: true,
    },
    passConfirm: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    verification: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
