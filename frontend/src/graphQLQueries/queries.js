import { gql } from "apollo-boost";

const getGroups = gql`
  query ($getGroupsDetails: userInput) {
    getGroups(getGroupsDetails: $getGroupsDetails) {
      _id
      user_id
      group_id
      has_invite
      Group {
        group_id
        group_name
        total_users
        user_list {
          _id
          has_invite
        }
      }
    }
  }
`;

const getAllUserNames = gql`
  query {
    getAllUserNames {
      _id
      user_id
      email
      name
      full_name
      profile_picture
      phone
      currency
      time_zone
      language
    }
  }
`;

const acceptInvite = gql`
  query ($acceptInviteDetails: groupInput) {
    acceptInvite(acceptInviteDetails: $acceptInviteDetails) {
      status
    }
  }
`;

const getTransactions = gql`
  query {
    getTransactions {
      _id
      amount
      payment_status
      cleared
      date_paid
      paid_by
      paid_to
      Group {
        _id
        group_name
        total_users
        user_list {
          _id
          user_id
          has_invite
        }
      }
    }
  }
`;

const getUser = gql`
  query ($getUserDetails: userInput) {
    getUser(getUserDetails: $getUserDetails) {
      _id
      full_name
      email
      profile_picture
      full_name
      language
      currency
      phone
      time_zone
      status
    }
  }
`;

export { getGroups, getAllUserNames, acceptInvite, getTransactions, getUser };
