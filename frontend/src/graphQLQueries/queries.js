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

export { loginMutation };
