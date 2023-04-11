import gql from "graphql-tag";

export const REGISTER_USER = gql`
  mutation Register($username: String, $fullName: String, $email: String, $password: String, $role: String, $phoneNumber: String, $address: String, $imgUrl: Upload) {
    register(username: $username, fullName: $fullName, email: $email, password: $password, role: $role, phoneNumber: $phoneNumber, address: $address, imgUrl: $imgUrl) {
      message
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      access_token
      UserId
      role
      username
    }
  }
`;
