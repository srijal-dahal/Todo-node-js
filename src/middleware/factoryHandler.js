const messageHandler = require("../utils/messageHandler");
const asyncHandler = require("./asyncHandler");

module.exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndDelete(req.params.todoid);
    if (!doc) {
      return res.status(404).send(messageHandler(false, "Id not found", 404));
    }
    return res.status(200).send(messageHandler(true, "Deleted SuccesFully", 200));
  });
};
module.exports.getOne = (Model, popOption) => {
 return asyncHandler(async (req, res) => {
    let query = Model.findById(req.params.todoid);
    if (popOption) query = query.populate(popOption);
    let doc = await query;
    if (!doc) {
      return res.status(404).send(messageHandler(false, "Id not found", 404));
    }
    return res.status(200).send(messageHandler(true, { doc }, 200));
  });
};

module.exports.getAll = (Model, popOption) => {
  return asyncHandler(async (req, res) => {
    let query = Model.find({});
    if (popOption) query = query.populate(popOption);
    let docs = await query;
    if (!docs) {
      return res
        .status(404)
        .send(messageHandler(false, "No documents found", 404));
    }
    return res.status(200).send(messageHandler(true, { docs }, 200));
  });
};
module.exports.createOne = (Model) => {
  return  asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    return res.status(201).send(messageHandler(true, { doc }, 201));
  });
};
module.exports.updateOne = (Model) => {
  return   asyncHandler(async (req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.todoid, req.body);
    if (!doc) {
      return res.status(404).send(messageHandler(false, "Id not found", 404));
    }
    return res.status(200).send(messageHandler(true, "Updated SuccesFully", 200));
  });
};
