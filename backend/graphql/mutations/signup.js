const User = require("./../../models/mongo/User");
const passwordHash = require("password-hash");

const signup = async (userDetails) => {
  res = {};
  const user = new User({
    email: userDetails.email,
    password: passwordHash.generate(userDetails.password),
    full_name: userDetails.full_name,
    phone: "none",
    currency: "USD",
    time_zone: "-8",
    language: "EN",
    profile_picture: "default.png",
  });
  try {
    resp = await user.save();
    console.log(resp);
    resp.status = 200;
    return resp;
  } catch (e) {
    res.status = 400;
    return res;
  }
};

module.exports = signup;
