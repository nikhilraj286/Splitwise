import "../../style.css";
import React from "react";
import "../../style.css";
import "font-awesome/css/font-awesome.min.css";
import logo from "../../logo.png";

const LeftBar = (props) => {
  let selectedId = null;
  if (props.tabSelected) {
    if (props.tabSelected === 4 && props.groupSelected > 0) {
      selectedId = "group" + props.tabSelected + props.groupSelected;
    } else if (props.tabSelected < 4) {
      selectedId = "tab" + props.tabSelected;
    }
  }
  if (selectedId && document.getElementById(selectedId)) {
    document.getElementById(selectedId).classList.add("selected-tab");
  }
  return (
    <div>
      {props.tabs.map((tabItem) => {
        let tabLogo = [];
        if (tabItem.name === "Dashboard") {
          tabLogo.push(
            <img
              alt=""
              src={logo}
              style={{
                width: "15px",
                height: "100%",
                marginTop: "-3px",
                marginRight: "8px",
              }}
            />
          );
        } else if (tabItem.name === "Recent Activity") {
          tabLogo.push(
            <i className="fa fa-flag" style={{ marginRight: "8px" }}></i>
          );
        } else {
          tabLogo.push(
            <i className="fa fa-users" style={{ marginRight: "8px" }}></i>
          );
        }

        return (
          <div>
            {tabItem.heading ? (
              <div className="left-group-division">
                <div
                  className="left-group-heading"
                  style={{
                    backgroundColor: "#eee",
                    borderRadius: "5px",
                    padding: "2px 0 2px 10px",
                    color: "gray",
                    margin: "8px 0",
                  }}
                >
                  {tabItem.name}
                </div>
                {props.groups.map((groupItem) => {
                  let item = null;
                  if (!groupItem.has_invite) {
                    item = (
                      <div
                        className="left-group-item"
                        href={"/home/groups/" + groupItem.group_id}
                        id={"group" + tabItem.key + groupItem.group_id}
                        onClick={() => {
                          props.changeTab(tabItem.key);
                          props.changeGroup(4, groupItem.group_id);
                          if (document.getElementById(selectedId)) {
                            document
                              .getElementById(selectedId)
                              .classList.remove("selected-tab");
                          }
                        }}
                      >
                        <i
                          className="fa fa-tag"
                          style={{ marginRight: "10px" }}
                        ></i>
                        {groupItem.Group.group_name}
                      </div>
                    );
                  }
                  return item;
                })}
              </div>
            ) : (
              <div
                className="left-tab-item"
                key={tabItem.key}
                id={"tab" + tabItem.key}
                onClick={() => {
                  props.changeTab(tabItem.key);
                  if (document.getElementById(selectedId)) {
                    document
                      .getElementById(selectedId)
                      .classList.remove("selected-tab");
                  }
                }}
              >
                {tabLogo}
                {tabItem.name}
              </div>
            )}
          </div>
        );
      })}
      <div
        className="left-group-heading"
        style={{
          backgroundColor: "#eee",
          borderRadius: "5px",
          padding: "2px 0 2px 10px",
          color: "gray",
          margin: "8px 0",
        }}
      >
        Users
      </div>
    </div>
  );
};
export default LeftBar;
