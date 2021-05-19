const User = require("./../../models/mongo/User");

const getAllUserNames = async () => {
  try {
    const users = await User.find({});
    output = [...users];
    output.forEach((item) => {
      item.user_id = item._id;
      item.name = item.full_name;
    });
    return output;
  } catch (e) {
    console.log(e);
  }
};

module.exports = getAllUserNames;
