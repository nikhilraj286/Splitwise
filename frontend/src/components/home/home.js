import React, { Component } from "react";
import "../../App.css";
import { Redirect } from "react-router";
import "../../css/buttons.css";
import "../style.css";
import LeftBar from "./leftBar/LeftBar";
import Dashboard from "./centerBar/dashboard";
import ViewGroup from "./centerBar/viewGroup";
import RecentActivity from "./centerBar/recentActivity";
import MyGroups from "./centerBar/myGroups";
// import { connect } from "react-redux";
// import { acceptInvite } from "../../store/actions/groupActions/acceptInviteActions";
// import { getGroups } from "../../store/actions/groupActions/getGroupsActions";
// import { getAllUsersNames } from "../../store/actions/userActions/getAllUserNamesActions";
import { withApollo } from "react-apollo";
import {
  getGroups,
  getAllUserNames,
  acceptInvite,
} from "./../../graphQLQueries/queries";

class Home extends Component {
  state = {
    tabSelected: 1,
    groupSelected: 0,
    tabs: [
      {
        key: 1,
        name: "Dashboard",
        logo: "",
        heading: false,
      },
      {
        key: 2,
        name: "Recent Activity",
        logo: "fa fa-flag",
        heading: false,
      },
      {
        key: 3,
        name: "My Groups",
        logo: "",
        heading: false,
      },
      {
        key: 4,
        name: "Groups",
        logo: "",
        heading: true,
      },
    ],
    groups: [],
    rerender: 0,
    inviteAccepted: false,
  };

  changeTab = (id) => {
    this.setState({
      tabSelected: id,
      rerender: this.state.rerender + 1,
    });
    let data = JSON.parse(localStorage.getItem("selectedTab"));
    data.tabSelected = id;
    localStorage.setItem("selectedTab", JSON.stringify(data));
  };

  changeGroup = (tabSelectedId, groupSelectedId) => {
    this.setState({
      tabSelected: tabSelectedId,
      groupSelected: groupSelectedId,
      rerender: this.state.rerender + 1,
    });
    let data = JSON.parse(localStorage.getItem("selectedTab"));
    data.tabSelected = tabSelectedId;
    data.groupSelected = groupSelectedId;
    localStorage.setItem("selectedTab", JSON.stringify(data));
  };

  acceptInvite = async (groupId) => {
    if (localStorage.getItem("userProfile")) {
      let userId = JSON.parse(localStorage.getItem("userProfile")).user_id;
      const data = {
        user_id: userId,
        group_id: groupId,
      };
      this.setState({
        inviteAccepted: false,
      });
      //   await this.props.acceptInvite(data);
      //   if (this.props.acceptInviteDetails === 200) {
      //     this.setState({
      //       inviteAccepted: true,
      //     });
      //   }
      let response = await this.props.client.query({
        query: acceptInvite,
        variables: {
          acceptInviteDetails: data,
        },
      });
      if (response.data.status === 200) {
        this.setState({
          inviteAccepted: true,
        });
      }
    }
  };

  componentDidMount = async () => {
    if (localStorage.getItem("selectedTab")) {
      let selectedTabData = JSON.parse(localStorage.getItem("selectedTab"));
      this.setState({
        groupSelected: selectedTabData.groupSelected,
        tabSelected: selectedTabData.tabSelected,
      });
    } else {
      let setItem = {
        tabSelected: 1,
        groupSelected: 0,
      };
      localStorage.setItem("selectedTab", JSON.stringify(setItem));
    }
    if (localStorage.getItem("userProfile")) {
      let userProfile = JSON.parse(localStorage.getItem("userProfile"));
      let userId = userProfile.user_id;
      const data = {
        user_id: userId,
      };

      //   await this.props.getGroups(data);
      //   if (this.props.getGroupsDetails !== 400) {
      //     this.setState({
      //       groups: this.props.getGroupsDetails,
      //     });
      //   }

      let response = await this.props.client.query({
        query: getGroups,
        variables: {
          getGroupsDetails: data,
        },
      });
      if (response.data.getGroups.length > 0) {
        this.setState({
          groups: response.data.getGroups,
        });
      }
      //   await this.props.getAllUsersNames();
      // response = await this.props.client.query({
      //   query: getAllUserNames,
      // });
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      localStorage.getItem("userProfile") &&
      this.state.inviteAccepted === true &&
      prevState.inviteAccepted === false
    ) {
      let userProfile = JSON.parse(localStorage.getItem("userProfile"));
      let userId = userProfile.user_id;
      const data = {
        user_id: userId,
      };
      //   await this.props.getGroups(data);
      //   if (this.props.getGroupsDetails !== 400) {
      //     this.setState({
      //       groups: this.props.getGroupsDetails,
      //     });
      //   }
      let response = await this.props.client.query({
        query: getGroups,
        variables: {
          getGroupsDetails: data,
        },
      });

      if (response.data.getGroups.length > 0) {
        this.setState({
          groups: response.data.getGroups,
        });
      }
    }
  };

  render = () => {
    // console.log(this.state);
    // console.log(this.props);
    let redirectVar = null;
    if (!localStorage.getItem("userProfile")) {
      redirectVar = <Redirect to="/login" />;
    }
    var comp = "";
    if (this.state.tabSelected === 1 || this.state.tabSelected === 0) {
      comp = <Dashboard />;
    } else if (this.state.tabSelected === 2) {
      comp = <RecentActivity />;
    } else if (this.state.tabSelected === 3) {
      comp = (
        <MyGroups
          tabs={this.state.tabs}
          groups={this.state.groups}
          tabSelected={this.state.tabSelected}
          groupSelected={this.state.groupSelected}
          changeTab={this.changeTab}
          changeGroup={this.changeGroup}
          acceptInvite={this.acceptInvite}
        />
      );
    } else if (this.state.tabSelected === 4) {
      comp = <ViewGroup groupID={this.state.groupSelected} />;
    }
    return (
      <div>
        {redirectVar}
        <div style={{ width: "75%" }} className="container">
          <div className="row">
            <div
              className="col-2 leftBar"
              style={{ marginRight: "10px", width: "18%" }}
            >
              <div className="inner">
                <LeftBar
                  tabs={this.state.tabs}
                  groups={this.state.groups}
                  tabSelected={this.state.tabSelected}
                  groupSelected={this.state.groupSelected}
                  changeTab={this.changeTab}
                  changeGroup={this.changeGroup}
                />
              </div>
            </div>
            <div className="col centerBar" style={{ padding: "0" }}>
              <div className="inner">{comp}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

// const mapStateToProps = (state) => {
//   return {
//     acceptInviteDetails: state.acceptInviteDetails.user,
//     getGroupsDetails: state.getGroupsDetails.user,
//     getAllUsersNamesDetails: state.getAllUsersNamesDetails.user,
//   };
// };

// export default connect(mapStateToProps, {
//   acceptInvite,
//   getGroups,
//   getAllUsersNames,
// })(Home);

export default withApollo(Home);
