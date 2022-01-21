const messageHandler = require("../utils/messageHandler");
const asyncHandler = (handle) => {
  return async (req, res, next) => {
    try {
      await handle(req, res);
      next();
    } catch (error) {
      messageHandler(false, "Error from server", 500);
      next(error);
      console.log("asyncHandler error: ", error);
    }
  };
};
module.exports = asyncHandler;
