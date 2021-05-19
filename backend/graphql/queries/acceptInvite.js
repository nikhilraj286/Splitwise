const Group = require("./../../models/mongo/Group");

const acceptInvite = async (acceptInviteDetails) => {
  try {
    res = {};
    await Group.findOneAndUpdate(
      {
        _id: acceptInviteDetails.group_id,
        "user_list._id": acceptInviteDetails.user_id,
      },
      {
        $set: {
          "user_list.$.has_invite": false,
        },
      }
    ).exec((err, result) => {
      if (err) {
        res.status = 404;
      }
      res.status = 200;
    });
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports = acceptInvite;
