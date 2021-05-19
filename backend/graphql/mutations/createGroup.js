const Group = require("./../../models/mongo/Group");

const createGroup = async (createGroupDetails) => {
  userList = [];
  //   keys = Object.keys(createGroupDetails.user_list);
  //   keys.forEach((item) => {
  //     data = {};
  //     data._id = createGroupDetails.user_list[item].user_id;
  //     data.has_invite = true;
  //     if (createGroupDetails.user_list[item].canBeDeleted === 0) {
  //       data.has_invite = false;
  //     }
  //     userList.push(data);
  //   });

  createGroupDetails.user_list.forEach((item) => {
    data = {};
    data._id = item.user_id;
    data.has_invite = true;
    if (item.canBeDeleted === 0) {
      data.has_invite = false;
    }
    userList.push(data);
  });
  const group = new Group({
    group_name: createGroupDetails.group_name,
    group_desc: "",
    total_users: createGroupDetails.no_of_users,
    user_list: userList,
  });
  try {
    await group.save();
    group.status = 200;
    return group;
  } catch (err) {
    console.log(err);
    return { status: 400 };
  }
};

module.exports = createGroup;
