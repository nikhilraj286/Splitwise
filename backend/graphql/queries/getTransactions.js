const Transaction = require("./../../models/mongo/Transaction");

const getTransactions = async () => {
  return new Promise((resolve, reject) => {
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
  //   try {
  //     Transaction.find({})
  //       .sort({ date_paid: -1 })
  //       .populate("group_id")
  //       .exec((err, result) => {
  //         if (err) {
  //           throw "Transactions not found!";
  //         }
  //         console.log(result);
  //         output = [...result];
  //         output.forEach((item) => {
  //           output.Group = item.group_id;
  //         });
  //         return result;
  //       });
  //   } catch (err) {
  //     return res.status(400).send(err);
  //   }
};

module.exports = getTransactions;
