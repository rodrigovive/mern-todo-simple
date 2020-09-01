const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
