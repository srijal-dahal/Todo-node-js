const messageHandler = require("../utils/messageHandler");
const asyncHandler = (handle) => {
  return async (req, res, next) => {
    try {
      await handle(req, res);
      next();
    } catch (error) {
      messageHandler(false, error.message, error.statusCode);
      next(error);
      console.log("asyncHandler error: ", error);
    }
  };
};
module.exports = asyncHandler;
