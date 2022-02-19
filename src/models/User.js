const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcrypt");
const keys = require("../config/keys");

const UserSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            select: false,
        },
        todos: {
            type: Schema.Types.ObjectId,
            ref: "Todo",
        },
    },
    {
        timestamps: true,
    }
);
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});
UserSchema.methods.generateToken = async function () {
    return jwt.sign({ id: this._id }, keys.signature, {
        expiresIn: 7 * 24 * 60 * 60,
    });
};
UserSchema.statics.login = async function (email, password) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return Error("Invalid email");
    console.log(user.password);
    const userPassword = await bcrypt.compare(password, user.password);
    if (!userPassword) return Error("Invalid password");
    return user;
};
function validateUser(user) {
    const schema = joi.object({
        name: joi.string().min(3),
        email: joi.string().required().min(5).max(255).email(),
        password: joi.string().required().min(8).max(255),
    });
    return schema.validate(user);
}
const User = model("User", UserSchema);
module.exports = { User, validateUser };
