import { gql } from "apollo-boost";

const loginMutation = gql`
  mutation ($userDetails: userInput) {
    login(userDetails: $userDetails) {
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

const signupMutation = gql`
  mutation ($userDetails: userInput) {
    signup(userDetails: $userDetails) {
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

const createGroupMutation = gql`
  mutation ($createGroupDetails: groupInput) {
    createGroup(createGroupDetails: $createGroupDetails) {
      group_name
      status
    }
  }
`;

const updateUserMutation = gql`
  mutation ($updateUserDetails: userInput) {
    updateUser(updateUserDetails: $updateUserDetails) {
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

const newExpense = gql`
  mutation ($newExpenseDetails: expenseInput) {
    newExpense(newExpenseDetails: $newExpenseDetails) {
      _id
      amount
      date_paid
      paid_by
      paid_to
    }
  }
`;

export {
  loginMutation,
  signupMutation,
  createGroupMutation,
  updateUserMutation,
  newExpense,
};
