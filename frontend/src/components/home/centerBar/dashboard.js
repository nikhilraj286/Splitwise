import { Button, Modal } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { settleup } from "../../../store/actions/transactionActions/settleupActions";
// import { getTransactions } from "../../../store/actions/transactionActions/getTransactionsActions";
// import { getAllUserNames } from "./../../../graphQLQueries/queries";
import { withApollo } from "react-apollo";
import {
  getAllUserNames,
  getTransactions,
} from "./../../../graphQLQueries/queries";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: null,
      show: false,
      selected: false,
      selectedPerson: 0,
      rerender: 0,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleSubmit = async () => {
    let userId = localStorage.getItem("userProfile")
      ? JSON.parse(localStorage.getItem("userProfile")).user_id
      : null;
    this.handleClose();
    let trans = this.state.transactions;
    const data = [];
    trans.forEach((item) => {
      if (
        item.payment_status === "due" &&
        item.cleared === false &&
        ((item.paid_by === userId &&
          item.paid_to === this.state.selectedPerson) ||
          (item.paid_by === this.state.selectedPerson &&
            item.paid_to === userId))
      ) {
        data.push(item);
      }
    });

    await this.props.settleup({ transList: data });
    if (this.props.settleupDetails === 200) {
      this.setState({
        settledUp: true,
      });
    }
    // await this.props.getTransactions();
    // if (this.props.getTransactionsDetails !== 400) {
    //   this.setState({
    //     transactions: this.props.getTransactionsDetails,
    //   });
    // }
    let trans1 = await this.props.client.query({
      query: getTransactions,
    });
    if (trans1.data.getTransactions && trans1.data.getTransactions.length > 0) {
      this.setState({ transactions: trans1.data.getTransactions });
    }
  };

  componentDidMount = async () => {
    // await this.props.getTransactions();
    // if (this.props.getTransactionsDetails !== 400) {
    //   this.setState({
    //     transactions: this.props.getTransactionsDetails,
    //   });
    // }
    let trans = await this.props.client.query({
      query: getTransactions,
    });
    if (trans.data.getTransactions && trans.data.getTransactions.length > 0) {
      this.setState({ transactions: trans.data.getTransactions });
    }
    let response = await this.props.client.query({
      query: getAllUserNames,
    });
    if (response.data.getAllUserNames.length > 0) {
      let output = [];
      response.data.getAllUserNames.forEach((item) => {
        output[String(item._id)] = item;
      });
      await this.setState({ getAllUserNames: output });
    }
  };

  render = () => {
    // console.log(this.state);
    let you_owe = [];
    let owes_you = [];
    let allUserList = [];
    let total_you_owe = 0;
    let total_owes_you = 0;
    let grand_total = 0;
    let currencyIcon = JSON.parse(localStorage.getItem("currency"));
    if (this.state.transactions) {
      let trans = this.state.transactions;
      let expense_sum = {};
      // let allUsers = this.props.getAllUsersNamesDetails;
      let allUsers = this.state.getAllUsersNamesDetails;
      let userId = JSON.parse(localStorage.getItem("userProfile"))
        ? JSON.parse(localStorage.getItem("userProfile")).user_id
        : null;
      if (allUsers && allUsers.length > 0) {
        let temp = Object.keys(allUsers);

        temp.forEach((item) => {
          expense_sum[item] = 0;
        });
        trans.forEach((item) => {
          if (
            (item.paid_by === userId || item.paid_to === userId) &&
            item.paid_by !== item.paid_to
          ) {
            expense_sum[item.paid_by] =
              expense_sum[item.paid_by] + Number(item.amount);
            expense_sum[item.paid_to] =
              expense_sum[item.paid_to] - Number(item.amount);
          }
        });
        temp.forEach((item) => {
          if (item !== userId) {
            var amount = expense_sum[item];
            amount = Number(amount.toFixed(2));
            if (amount !== 0) {
              allUserList.push(
                <option key={item} dataId={item}>
                  {allUsers[item].name}
                </option>
              );
            }
            if (amount < 0) {
              total_owes_you = total_owes_you + amount;
              amount = amount * -1;
              owes_you.push(
                <div>
                  <div
                    className="row"
                    style={{ margin: "0", padding: "10px 0" }}
                  >
                    <div
                      className="col-3"
                      style={{
                        paddingRight: "0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        alt=""
                        src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-orange47-100px.png"
                        className="avatar"
                        style={{ width: "65%", borderRadius: "25px" }}
                      />
                    </div>
                    <div className="col-8" style={{ paddingLeft: "0" }}>
                      <div style={{ marginBottom: "5px" }}>
                        {allUsers[item].name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#5bc5a7" }}>
                        <strong>
                          owes you {currencyIcon}
                          {amount}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else if (amount > 0) {
              total_you_owe = total_you_owe + amount;
              you_owe.push(
                <div>
                  <div
                    className="row"
                    style={{ margin: "0", padding: "10px 0" }}
                  >
                    <div
                      className="col-3"
                      style={{
                        paddingRight: "0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        alt=""
                        src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-orange47-100px.png"
                        className="avatar"
                        style={{ width: "65%", borderRadius: "25px" }}
                      />
                    </div>
                    <div className="col-8" style={{ paddingLeft: "0" }}>
                      <div style={{ marginBottom: "5px" }}>
                        {allUsers[item].name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#ff652f" }}>
                        <strong>
                          you owe {currencyIcon}
                          {amount}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            total_owes_you = Number(total_owes_you.toFixed(2));
            total_you_owe = Number(total_you_owe.toFixed(2));
            grand_total = total_owes_you + total_you_owe;
            grand_total = Number(grand_total.toFixed(2));
          }
        });
      }
    }

    function getColor(amount) {
      if (amount < 0) {
        return "#ff652f";
      }
      if (amount > 0) {
        return "#5bc5a7";
      }
      return "#777";
    }
    return (
      <div>
        <div className="row">
          <div
            className="col-8"
            style={{
              paddingRight: "0",
              boxShadow: "3px 0 3px -4px rgba(31, 73, 125, 0.8)",
              minHeight: "100vh",
            }}
          >
            <div className="main_row">
              <div
                className="row"
                style={{
                  backgroundColor: "#eee",
                  padding: "20px 10px",
                  margin: "0",
                }}
              >
                <div className="col-4">
                  <h3>Dashboard</h3>
                </div>
                <div className="col-8">
                  <ul
                    className="nav navbar-nav navbar-right"
                    style={{ flexDirection: "row", float: "right" }}
                  >
                    <Link
                      className="btn link-green"
                      id="createGroup"
                      to="/group/new"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: "bold",
                        marginRight: "15px",
                      }}
                    >
                      Create New Group
                    </Link>
                    <div
                      className="btn btn-orange"
                      onClick={this.handleShow}
                      to="/"
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontWeight: "bold",
                        marginRight: "15px",
                      }}
                    >
                      Settle Up
                    </div>
                    <Modal
                      show={this.state.show}
                      onHide={this.handleClose}
                      backdrop="static"
                      keyboard={false}
                      style={{ maxHeight: "700px" }}
                    >
                      <Modal.Header>
                        <Modal.Title>Add an expense</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p style={{ margin: "0" }}>
                          Select user you want to settle with
                        </p>
                        <div>
                          <input
                            className="form-control"
                            list="dashboard"
                            id="newPerson"
                            placeholder="Name"
                            onInput={async (e) => {
                              // let allUsers = this.props.getAllUsersNamesDetails;
                              let allUsers = this.state.getAllUsersNames;
                              var keys = Object.keys(allUsers);

                              if (keys.length > 0) {
                                keys.forEach((item) => {
                                  let data = allUsers[item];
                                  if (e.target.value.includes(data.name)) {
                                    this.setState({
                                      selectedPerson: data.user_id,
                                      selected: true,
                                    });
                                  }
                                });
                              }
                            }}
                            style={{
                              height: "38px",
                              width: "50%",
                              marginTop: "10px",
                            }}
                          />
                          <datalist id="dashboard">{allUserList}</datalist>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="btn btn-primary"
                          onClick={this.handleClose}
                        >
                          cancel
                        </Button>
                        <Button
                          className="btn btn-green"
                          onClick={this.handleSubmit}
                        >
                          settle
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </ul>
                </div>
              </div>
              <hr style={{ margin: 0, color: "#555" }} />
              <div
                className="summary_data row"
                style={{
                  textAlign: "center",
                  backgroundColor: "#eee",
                  margin: "0",
                  padding: "5px 10px",
                }}
              >
                <div className="col" style={{ padding: "15px 0" }}>
                  <div>total balance</div>
                  <div style={{ color: getColor(grand_total * -1) }}>
                    {grand_total < 0 ? "+" : ""}
                    {grand_total > 0 ? "-" : ""}
                    {currencyIcon}
                    {grand_total < 0 ? grand_total * -1 : grand_total}
                  </div>
                </div>
                <div
                  className="col"
                  style={{
                    boxShadow:
                      "3px 0 3px -4px rgba(31, 73, 125, 0.8), -3px 0 3px -4px rgba(31, 73, 125, 0.8)",
                    padding: "15px 0",
                  }}
                >
                  <div>you owe</div>
                  <div style={{ color: getColor(total_you_owe * -1) }}>
                    {currencyIcon}
                    {total_you_owe < 0 ? total_you_owe * -1 : total_you_owe}
                  </div>
                </div>
                <div className="col" style={{ padding: "15px 0" }}>
                  <div>you are owed</div>
                  <div style={{ color: getColor(total_owes_you * -1) }}>
                    {currencyIcon}
                    {total_owes_you < 0 ? total_owes_you * -1 : total_owes_you}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="row justify-content-center"
                style={{ margin: "40px 0" }}
              >
                <div
                  className="col-5"
                  style={{ boxShadow: "3px 0 3px -4px rgba(31, 73, 125, 0.8)" }}
                >
                  {you_owe}
                </div>
                <div className="col-5">{owes_you}</div>
                {owes_you.length === 0 && you_owe.length === 0 ? (
                  <div>
                    <div
                      className="alert alert-light"
                      style={{ textAlign: "center" }}
                      role="alert"
                    >
                      No data to display
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-4" style={{ fontSize: "14px" }}>
            <div id="right_sidebar_content">
              <h5>Get Splitwise Pro!</h5>
              <img
                height="128"
                style={{ margin: "5px 0" }}
                alt="purple-logo"
                src="https://assets.splitwise.com/assets/pro/logo-337b1a7d372db4b56c075c7893d68bfc6873a65d2f77d61b27cb66b6d62c976c.svg"
              />
              <div>
                <p style={{ width: "80%", marginTop: "10px" }}>
                  Subscribe to <strong>Splitwise Pro</strong> for no ads,
                  currency conversion, charts, search, and more.
                </p>
              </div>
              <button
                className="btn btn-orange disabled"
                style={{ fontWeight: "bold", marginTop: "8px" }}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

// const mapStateToProps = (state) => {
//   return {
//     settleupDetails: state.settleupDetails.user,
//     getTransactionsDetails: state.getTransactionsDetails.user,
//     getAllUsersNamesDetails: state.getAllUsersNamesDetails.user,
//   };
// };

// export default connect(mapStateToProps, { settleup, getTransactions })(
//   Dashboard
// );

export default withApollo(Dashboard);
