const { Schema, model } = require("mongoose");
const Joi = require("joi");
const TodDoSchema = Schema(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);
const validateTodo = (todo) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        status: Joi.boolean().required(),
    });
    return schema.validate(todo);
};
const Todo = model("Todo", TodDoSchema);
module.exports = { Todo, validateTodo };
