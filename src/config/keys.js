require("dotenv").config({ path: `${__dirname}/.env` });
module.exports = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODBURI,
    signature: process.env.SIGNATURE,
};
