const User = require("./../models/mongo/User");

const getUserHandler = async (msg, callback) => {
  res = {};
  try {
    const user = await User.findOne(
      { _id: msg.user_id },
      "full_name email _id currency time_zone language phone profile_picture"
    );
    if (user === null) {
      res.status = 404;
      callback(null, res);
    }
    res.status = 200;
    res.data = JSON.stringify(user);
    callback(null, res);
  } catch (err) {
    res.status = 500;
    callback(null, res);
  }
};

const updateUserHandler = async (msg, callback) => {
  res = {};
  let data = {};
  if (msg.email) {
    data.email = msg.email;
  }
  if (msg.full_name) {
    data.full_name = msg.full_name;
  }
  if (msg.phone) {
    data.phone = msg.phone;
  }
  if (msg.currency) {
    data.currency = msg.currency;
  }
  if (msg.time_zone) {
    data.time_zone = msg.time_zone;
  }
  if (msg.language) {
    data.language = msg.language;
  }
  if (msg.profile_picture) {
    data.profile_picture = msg.profile_picture;
  }
  try {
    await User.findOneAndUpdate(
      { _id: msg.user_id },
      { $set: data },
      { new: true },
      (err, result) => {
        if (err) {
          res.status = 400;
          callback(null, res);
        }
        res.status = 200;
        res.data = JSON.stringify(result);
        callback(null, res);
      }
    );
  } catch (err) {
    res.status = 500;
    callback(null, res);
  }
};

const getUsersHandler = async (msg, callback) => {
  res = {};
  try {
    await User.find(
      {},
      "full_name email _id currency time_zone language phone profile_picture",
      (err, result) => {
        if (err) {
          res.status = 404;
          res.data = JSON.stringify(err);
          callback(null, res);
        }
        output = [];
        for (let item of result) {
          let data = JSON.parse(JSON.stringify(item));
          data.user_id = String(item._id);
          output.push(data);
        }
        res.status = 200;
        res.data = JSON.stringify(output);
        callback(null, res);
      }
    );
  } catch (err) {
    res.status = 500;
    callback(null, res);
  }
};

const getAllUsersNamesHandler = async (msg, callback) => {
  res = {};
  try {
    await User.find({}, "full_name email _id", (err, result) => {
      if (err) {
        res.status = 404;
        res.data = JSON.stringify(err);
        callback(null, res);
      }
      output = {};
      for (let item of result) {
        let data = JSON.parse(JSON.stringify(item));
        data.user_id = String(item._id);
        data.name = item.full_name;
        delete data.full_name;
        delete data._id;
        output[item._id] = data;
      }
      res.status = 200;
      res.data = JSON.stringify(output);
      callback(null, res);
    });
  } catch (err) {
    res.status = 500;
    callback(null, res);
  }
};

handle_request = (msg, callback) => {
  if (msg.path === "get-user") {
    delete msg.path;
    getUserHandler(msg, callback);
  }
  if (msg.path === "update-user") {
    delete msg.path;
    updateUserHandler(msg, callback);
  }
  if (msg.path === "get-users") {
    delete msg.path;
    getUsersHandler(msg, callback);
  }
  if (msg.path === "get-all-users-names") {
    delete msg.path;
    getAllUsersNamesHandler(msg, callback);
  }
};

exports.handle_request = handle_request;
