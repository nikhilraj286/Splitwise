import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../store/actions/userActions/getUsersActions";
import { createGroup } from "../../store/actions/groupActions/createGroupActions";
import "../style.css";
import { Redirect } from "react-router";

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scroll: false,
      allUsers: {},
      usersToAdd: {},
      selected: false,
      selectedPerson: null,
      groupName: "",
      filter: null,
      groupCreated: false,
      duplicateGroup: false,
    };
    this.createGroup = this.createGroup.bind(this);
  }

  createGroup = async () => {
    let data = {
      user_list: { ...this.state.usersToAdd },
      group_name: this.state.groupName,
      no_of_users: Object.keys(this.state.usersToAdd).length,
    };
    await this.props.createGroup(data);
    if (this.props.createGroupDetails === 200) {
      this.setState({ groupCreated: true });
    } else {
      this.setState({ duplicateGroup: true });
    }
  };

  componentDidMount = async () => {
    await this.props.getUsers();
    if (this.props.getUsersDetails !== 400) {
      let index = 0;
      let current_user_id = localStorage.getItem("userProfile")
        ? JSON.parse(localStorage.getItem("userProfile")).user_id
        : null;
      let temp_data = this.props.getUsersDetails;
      let user_data_1 = {};
      let user_data_2 = {};
      for (index; index < temp_data.length; index++) {
        let temp_val = temp_data[index];
        let data = {
          user_id: temp_val.user_id,
          email: temp_val.email,
          full_name: temp_val.full_name,
          canBeDeleted: 0,
        };
        if (temp_val.user_id === current_user_id) {
          user_data_1[temp_val.user_id] = data;
        } else {
          data.canBeDeleted = 1;
          user_data_2[temp_val.user_id] = data;
        }
      }
      await this.setState({
        allUsers: user_data_2,
        usersToAdd: user_data_1,
      });
    }
  };

  render = () => {
    let redirectVar = null;
    let errMsg = null;
    if (!localStorage.getItem("userProfile")) {
      redirectVar = <Redirect to="/login" />;
    }
    if (this.state.groupCreated) {
      redirectVar = <Redirect to="/" />;
    }
    if (this.state.duplicateGroup) {
      errMsg = (
        <div
          className="alert alert-warning"
          style={{ margin: "70px auto", textAlign: "center" }}
          role="alert"
        >
          Group with same name already exists
        </div>
      );
    }

    let current_user = null;
    if (this.state.scroll) {
      document
        .getElementById("dropdown")
        .classList.add("secondary_fields-scroll");
    }
    if (localStorage.getItem("userProfile")) {
      current_user = JSON.parse(localStorage.getItem("userProfile"));
    }

    var personList = [];
    var keys1 = Object.keys(this.state.usersToAdd);
    if (this.state.usersToAdd && keys1.length > 0) {
      keys1.forEach((item) => {
        var data = this.state.usersToAdd[item];
        if (current_user) {
          if (item !== current_user.user_id && data.canBeDeleted === 1) {
            personList.push(
              <div className="row personList" style={{ margin: "0 0 15px 0" }}>
                <div
                  className="col-1"
                  style={{
                    padding: "0",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <img
                    style={{ borderRadius: "25px" }}
                    src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal30-50px.png"
                    alt=""
                  />
                </div>
                <div
                  className="col-10"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ margin: "0 0 0 10px" }} id={data.user_id}>
                    {data.full_name} ({data.email})
                  </p>
                </div>

                <div className="col-1" style={{ padding: "0" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="100%"
                    fill="#ff652f"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      let data = { ...this.state.usersToAdd };
                      delete data[e.target.id];
                      this.setState({
                        usersToAdd: data,
                      });
                    }}
                  >
                    <path
                      id={data.user_id}
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                    />
                  </svg>
                </div>
              </div>
            );
          }
        }
      });
    }

    var availableUserList = [];
    var keys2 = Object.keys(this.state.allUsers);
    if (this.state.allUsers && keys2.length > 0) {
      if (this.state.filter && this.state.filter.length > 2) {
        keys2.forEach((item) => {
          var data = this.state.allUsers[item];
          if (
            data.full_name.includes(this.state.filter) ||
            data.email.includes(this.state.filter)
          ) {
            availableUserList.push(
              <option key={data.user_id} dataId={data.user_id}>
                {data.full_name} / {data.email}
              </option>
            );
          }
        });
      }
    }

    return (
      <div>
        {redirectVar}
        <div className="container">
          <div
            className="row"
            style={{
              width: "50%",
              margin: "auto",
              minHeight: "100vh",
              padding: "100px 0px",
              textAlign: "center",
            }}
          >
            <div className="col-5" style={{ padding: 0 }}>
              <img
                height="200"
                width="200"
                className="envelope"
                alt=""
                src="https://assets.splitwise.com/assets/core/logo-square-65a6124237868b1d2ce2f5db2ab0b7c777e2348b797626816400534116ae22d7.svg"
              />
              <input
                type="file"
                id="myFile"
                name="filename"
                disabled
                style={{ width: "60%", fontSize: "11px", margin: "10px 0" }}
              />
            </div>
            <div className="col" style={{ textAlign: "left" }}>
              <h4>START A NEW GROUP</h4>
              <form>
                <label htmlFor="groupName">My group shall be called..</label>
                <br></br>
                <input
                  type="text"
                  id="groupName"
                  placeholder="Funkytown"
                  style={{
                    width: "100%",
                    height: "38px",
                    paddingLeft: "10px",
                    marginTop: "10px",
                  }}
                  onChange={(e) => {
                    this.setState({
                      scroll: true,
                      groupName: e.target.value,
                    });
                  }}
                  onKeyUp={this.handleDropDown}
                />
                <div className="secondary_fields" id="dropdown">
                  <hr />
                  <p style={{ fontSize: "18px" }}>GROUP MEMEBERS</p>
                  <p style={{ fontSize: "12px" }}>
                    Tip: Lots of people to add? Send you friends an{" "}
                    <span style={{ color: "#0088cc" }}>invite link</span>
                  </p>

                  <div
                    className="row personList"
                    style={{ margin: "0 0 15px 0" }}
                  >
                    <div
                      className="col-1"
                      style={{
                        padding: "0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{ borderRadius: "25px" }}
                        src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-teal30-50px.png"
                        alt=""
                      />
                    </div>
                    <div
                      className="col-10"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{ margin: "0 0 0 10px" }}
                        id={current_user ? current_user.user_id : ""}
                      >
                        {current_user ? current_user.full_name : ""} (
                        {current_user ? current_user.email : ""})
                      </p>
                    </div>
                    <div className="col-1" style={{ padding: "0" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="100%"
                        fill="#fff"
                        className="bi bi-record-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"
                        />
                      </svg>
                    </div>
                  </div>

                  {personList}

                  <div
                    className="row addPerson"
                    style={{ margin: "0 0 15px 0" }}
                    id="addPerson"
                  >
                    <div
                      className="col-1"
                      style={{
                        padding: "0",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        style={{ borderRadius: "25px" }}
                        src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey1-50px.png"
                        alt=""
                      />
                    </div>
                    <div
                      className="col-10"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        className="form-control"
                        list="datalistOptions"
                        id="newPerson"
                        placeholder="Name or Email address"
                        onChange={async (e) => {
                          await this.setState({
                            filter: e.target.value,
                          });
                          var keys = Object.keys(this.state.allUsers);
                          if (this.state.allUsers && keys.length > 0) {
                            keys.forEach((item) => {
                              let data = this.state.allUsers[item];
                              if (e.target.value.includes(data.email)) {
                                this.setState({
                                  selectedPerson: data.user_id,
                                  selected: true,
                                });
                              }
                            });
                          }
                        }}
                        style={{ height: "38px" }}
                      />
                      <datalist id="datalistOptions">
                        {availableUserList}
                      </datalist>
                    </div>
                    <div className="col-1" style={{ padding: "0" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="100%"
                        fill="#5bc5a7"
                        className="bi bi-arrow-right-circle-fill"
                        viewBox="0 0 16 16"
                        style={{ cursor: "pointer" }}
                        disabled={!this.state.selected}
                        onClick={(e) => {
                          var keys = Object.keys(this.state.usersToAdd);
                          if (
                            !keys.includes(this.state.selectedPerson) &&
                            this.state.selectedPerson
                          ) {
                            let data = {
                              ...this.state.allUsers[this.state.selectedPerson],
                            };
                            let selectedData = { ...this.state.usersToAdd };
                            selectedData[this.state.selectedPerson] = data;
                            this.setState({
                              usersToAdd: selectedData,
                              selected: false,
                              selectedPerson: 0,
                            });
                            document.getElementById("newPerson").value = "";
                            document
                              .getElementById("addPerson")
                              .classList.add("hidden");
                          }
                        }}
                      >
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                      </svg>
                    </div>
                  </div>

                  <div
                    className="addPersonButton"
                    style={{ margin: "0 0 15px 10px" }}
                  >
                    <div
                      style={{
                        color: "#0088cc",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                      onClick={(e) => {
                        document
                          .getElementById("addPerson")
                          .classList.remove("hidden");
                      }}
                    >
                      + Add a person
                    </div>
                  </div>

                  <hr />

                  <div className="row">
                    <div
                      onClick={this.createGroup}
                      href="/"
                      className="btn btn-primary btn-orange"
                      style={{
                        width: "25%",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        fontWeight: "bold",
                        margin: "0 0 0 15px",
                      }}
                    >
                      Save
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {errMsg}
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    getUsersDetails: state.getUsersDetails.user,
    createGroupDetails: state.createGroupDetails.user,
  };
};

export default connect(mapStateToProps, { createGroup, getUsers })(AddGroup);
