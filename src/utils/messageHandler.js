function messageHandler(success, message, statusCode) {
  return {
    success: success,
    message: message,
    statusCode: statusCode,
  };
}
module.exports = messageHandler;
