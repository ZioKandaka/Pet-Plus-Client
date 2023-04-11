import { gql } from "@apollo/client";

export const GET_PET_BY_USER_ID = gql`
  query FetchPet($userId: ID) {
    fetchPets(UserId: $userId) {
      id
      name
      imgUrl
      gender
      species
      breed
      description
      weight
      UserId
      User {
        id
        username
        fullName
        email
        imgUrl
        role
        phoneNumber
        address
      }
    }
  }
`;

export const LOGIN_QUERY = gql`
  mutation Mutation($email: String, $password: String) {
    login(email: $email, password: $password) {
      access_token
      UserId
      role
      username
    }
  }
`;

export const USER_BY_ID = gql`
  query Query($userById: ID!) {
    userById(id: $userById) {
      id
      username
      fullName
      email
      imgUrl
      role
      phoneNumber
      address
    }
  }
`;
