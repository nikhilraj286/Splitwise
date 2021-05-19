const User = require("./../../models/mongo/User");

const getUser = async (getUserDetails) => {
  try {
    const user = await User.findOne({ _id: getUserDetails.user_id });
    if (user === null) {
      return { status: 404 };
    }
    user.status = 200;
    return user;
  } catch (err) {
    return { status: 404 };
  }
};

module.exports = getUser;
