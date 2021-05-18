const User = require("./../../models/mongo/User");

const getAllUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (e) {
    console.log(e);
  }
};

module.exports = getAllUsers;
