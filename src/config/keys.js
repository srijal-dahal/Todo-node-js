require("dotenv").config({ path: `${__dirname}/.env` });
console.log(__dirname);
console.log(process.env.PORT);
module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODBURI,
};
