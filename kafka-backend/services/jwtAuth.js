const User = require("./../models/mongo/User");

const jwtAuthHandler = async (msg, callback) => {
  res = {};
  try {
    User.findById(msg.user_id, (err, results) => {
      if (err) {
        res.status = 404;
        res.data = err;
        return callback(null, res);
      }
      if (results) {
        res.status = 200;
        res.data = results;
        callback(null, res);
      } else {
        res.status = 500;
        callback(null, res);
      }
    });
  } catch (err) {
    res.status = 500;
    callback(null, res);
  }
};

handle_request = (msg, callback) => {
  if (msg.path === "jwt-auth") {
    delete msg.path;
    jwtAuthHandler(msg, callback);
  }
};

exports.handle_request = handle_request;
