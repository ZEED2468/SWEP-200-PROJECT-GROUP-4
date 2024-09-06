const Supervisor = require("../models/Supervisor");
const SuperAdmin = require("../models/SuperAdminModel");
const Token = require("../models/TokenModel");

const findUserLogs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such id" });
  }
  const supervisorTokenUsers = await Supervisor.find({ token: id });
  if (!supervisorTokenUsers) {
    return res.status(404).json({ error: `No such workout with id ${id}` });
  }

  res.status(200).json({ supervisorTokenUsers });
};

module.exports = {
  findUserLogs,
};
