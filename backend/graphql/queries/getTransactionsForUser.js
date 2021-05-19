const Transaction = require("./../../models/mongo/Transaction");

const getTransactionsForUser = async (getTransForUserDetails) => {
  return new Promise((resolve, reject) => {
    Transaction.find({ group_id: { $in: req.body.groupList } })
      .sort({ date_paid: 1 })
      .populate("group_id")
      .exec((err, result) => {
        if (err) {
          return res.status(404).send("Transactions not found!");
        }
        output = [];
        for (let item of result) {
          data = {};
          data.amount = item.amount;
          data.payment_status = item.payment_status;
          data.cleared = item.cleared;
          data.date_paid = item.date_paid;
          data.paid_by = item.paid_by;
          data.paid_to = item.paid_to;
          data.Group = item.group_id;
          output.push(data);
        }
        return res.status(200).send(output);
      });
    Transaction.find({})
      .sort({ date_paid: -1 })
      .populate("group_id")
      .exec((err, result) => {
        if (err) {
          throw "Transactions not found!";
        }
        output = [...result];
        output.forEach((item) => {
          item.Group = item.group_id;
        });
        // console.log(output);
        resolve(output);
      });
  });
};

module.exports = getTransactionsForUser;
