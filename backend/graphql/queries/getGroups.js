const Group = require("./../../models/mongo/Group");

const getGroups = async (getGroupsDetails) => {
  console.log(getGroupsDetails);
  try {
    let result = await Group.find({
      "user_list._id": getGroupsDetails.user_id,
    });
    let output = [];
    result.forEach((item) => {
      data = {};
      data.Group = {};
      data.group_id = item._id;
      data._id = item._id;
      item.user_list.forEach((item1) => {
        if (item1._id.equals(getGroupsDetails.user_id)) {
          data.has_invite = item1.has_invite;
          data.user_id = item1._id;
        }
      });
      data.Group.group_name = item.group_name;
      data.Group.group_desc = item.group_desc;
      data.Group.total_users = item.total_users;
      data.Group.group_id = item._id;
      data.Group.user_list = item.user_list;
      output.push(data);
    });
    return output;
  } catch (err) {
    return [];
  }
};

module.exports = getGroups;
