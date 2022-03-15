const asyncHandler = require("../middleware/asyncHandler");
const messageHandler = require("../utils/messageHandler");
const cookieParser = require("cookie-parser");
const { validateUser, User } = require("../models/User");

module.exports.register = asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
if (error)
        return res.status(401).send(messageHandler(false, error.message, 401));
    const checkUser = await User.find({
        email: req.body.email,
    });
    if(checkUser.length > 0){
        return res.status(401).send(messageHandler(false, "User already exists", 401));
   }
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        const token = await user.generateToken(user);
        user.accessToken = token;
        let userData = {
            uid: user._id,
            name: user.name,
            email: user.email,
        };

        res.cookie("Authorization", token, {
            maxAge: 1000 * 7 * 24 * 60 * 60,
            httpOnly: true,
        });

        return res.status(201).send(messageHandler(true, userData, 201));

});

module.exports.login = asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
        return res.status(401).send(messageHandler(false, error.message, 401));
    const user = await User.login(req.body.email, req.body.password);
    if (user.message)
        return res.status(401).send(messageHandler(false, user.message, 401));
    const accesstoken = await user.generateToken(user);
    await User.findByIdAndUpdate(user._id, accesstoken);
    let userData = {
        uid: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        token: accesstoken,
    };
    return res.status(201).send(messageHandler(true, userData, 201));
});
