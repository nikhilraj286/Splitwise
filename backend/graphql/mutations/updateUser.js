const User = require("./../../models/mongo/User");

const updateUser = async (updateUserDetails) => {
  let data = {};
  if (updateUserDetails.email) {
    data.email = updateUserDetails.email;
  }
  if (updateUserDetails.full_name) {
    data.full_name = updateUserDetails.full_name;
  }
  if (updateUserDetails.phone) {
    data.phone = updateUserDetails.phone;
  }
  if (updateUserDetails.currency) {
    data.currency = updateUserDetails.currency;
  }
  if (updateUserDetails.time_zone) {
    data.time_zone = updateUserDetails.time_zone;
  }
  if (updateUserDetails.language) {
    data.language = updateUserDetails.language;
  }
  if (updateUserDetails.profile_picture) {
    data.profile_picture = updateUserDetails.profile_picture;
  }
  try {
    let user = await User.findOneAndUpdate(
      { _id: updateUserDetails.user_id },
      { $set: data }
    );
    user.status = 200;
    return user;
  } catch (err) {
    return { status: 400 };
  }
};

module.exports = updateUser;
