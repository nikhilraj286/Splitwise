const User = require("./../../models/mongo/User");
const passwordHash = require("password-hash");

const login = async (userDetails) => {
  let res = {};
  try {
    const user = await User.findOne({ email: userDetails.email });
    if (!user) {
      throw "User not found";
    } else if (!passwordHash.verify(userDetails.password, user.password)) {
      res.status = 400;
    } else {
      res = JSON.parse(JSON.stringify(user));
      res.status = 200;
    }
    return res;
  } catch (e) {
    throw e;
  }
};

module.exports = login;
