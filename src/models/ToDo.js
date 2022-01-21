const { Schema, model } = require("mongoose");

const TodDoSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Todo = model("Todo", TodDoSchema);
module.exports = { Todo };
